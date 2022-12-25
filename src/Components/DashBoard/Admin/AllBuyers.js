import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { useWrongToken } from "../../Hooks/useWrongToken";
import Loading from "../../Load & Error/Loading";

const AllBuyers = () => {
  const [error1, setError] = useState("");

  const wrongToken = useWrongToken(error1);
  const {
    data: buyers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["allBuyers"],
    queryFn: async () => {
      const res = await axios.get(
        "https://book-worm-server.vercel.app/users_type?type=buyer",
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      // const data = await res.json();
      return res?.data;
    },
  });
  console.log(buyers);
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return setError(error);
  }

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://book-worm-server.vercel.app/users/${id}`, {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          })
          .then((result) => {
            console.log(result);
            if (result.data.acknowledged) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((err) => {
            setError(err);
          });
      }
    });
    console.log(id);
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-center my-5 text-gray-800 dark:text-gray-100">All Buyers</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-[#24253b]  dark:text-gray-400">
            <tr>
              <th></th>
              <th scope="col" className="py-4 px-7">
                Name
              </th>
              <th scope="col" className="py-4 px-7">
                Email
              </th>
              <th scope="col" className="py-4 px-7">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer,i) => {
              return (
                <tr
                  key={buyer?._id}
                  className="hover bg-gray-200 dark:bg-[#292A3D] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                  <th className="py-8 px-6">{i + 1}</th>
                  <td className="py-8 px-6">{buyer?.name}</td>
                  <td className="py-8 px-6">{buyer?.email}</td>

                  <td className="py-8 px-6">
                    <button
                      onClick={() => handleDelete(buyer._id)}
                      className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12"
                    >
                      <MdDeleteForever className="text-2xl"></MdDeleteForever>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllBuyers;
