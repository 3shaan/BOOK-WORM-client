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
      <h1 className="text-2xl font-semibold text-center my-5">All Buyers</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {sellers.map((seller, i) => {
              return (
                <tr key={seller?._id} className="hover">
                  <th>{i + 1}</th>
                  <td>{seller?.name}</td>
                  <td>{seller?.email}</td>
                  <td>
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
                  <td>
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
