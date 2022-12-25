import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever, MdVerified } from "react-icons/md";
import Swal from "sweetalert2";
import { useWrongToken } from "../../Hooks/useWrongToken";
import Loading from "../../Load & Error/Loading";

const AllSellers = () => {
  const [error1, setError] = useState("");

  const wrongToken = useWrongToken(error1);
  const {
    data: sellers,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["allSellers"],
    queryFn: async () => {
      const res = await axios.get(
        "https://book-worm-server.vercel.app/users_type?type=seller",
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
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return setError(error);
  }
  console.log(sellers);
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

  const handleVerify = (id, email) => {
    axios
      .put(`https://book-worm-server.vercel.app/users?id=${id}&email=${email}`)
      .then((data) => {
        console.log(data);
        let timerInterval;
        Swal.fire({
          title: "User Verifying....",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const b = Swal.getHtmlContainer().querySelector("b");
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft();
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            refetch();
            toast.success("verified successful");
            console.log("I was closed by the timer");
          }
        });
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center my-5 text-gray-800 dark:text-gray-100">All Seller</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-[#24253b]  dark:text-gray-400">
            <tr>
              <th scope="col" className="py-4 px-7"></th>
              <th scope="col" className="py-4 px-7">
                Name
              </th>
              <th scope="col" className="py-4 px-7">
                Email
              </th>
              <th scope="col" className="py-4 px-7">
                Verified
              </th>
              <th scope="col" className="py-4 px-7">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => {
              return (
                <tr
                  key={seller?._id}
                  className="hover bg-gray-200 dark:bg-[#292A3D] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                  <th className="py-8 px-6">{i + 1}</th>
                  <td className="py-8 px-6">{seller?.name}</td>
                  <td className="py-8 px-6">{seller?.email}</td>
                  <td className="py-8 px-6">
                    {seller?.user_verified ? (
                      <div>
                        <MdVerified className="text-blue-700 text-3xl"></MdVerified>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleVerify(seller._id, seller?.email)}
                        className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600"
                      >
                        Verify
                      </button>
                    )}
                  </td>
                  <td className="py-8 px-6">
                    <button
                      onClick={() => handleDelete(seller?._id)}
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

export default AllSellers;
