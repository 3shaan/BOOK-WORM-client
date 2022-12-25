import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { FaAmazonPay } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../../../Context/Context";
import { useWrongToken } from "../../Hooks/useWrongToken";
import Loading from "../../Load & Error/Loading";

const WishList = () => {
  const { user } = useContext(authContext);
  const [err, setError] = useState("");

  const wrongToken = useWrongToken(err);
  const {
    data: wishListData,
    isLoading,
    refetch,
    isError,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
      const data = await axios.get(
        `https://book-worm-server.vercel.app/wishlist?email=${user?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      return data.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    setError(error);
  }
  console.log(wishListData);

  const handleDelete = (id) => {
    console.log(id);
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
          .delete(`https://book-worm-server.vercel.app/wishlist/${id}`, {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          })
          .then((data) => {
            console.log(data);
            if (data.data.acknowledged) {
              refetch();
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
          })
          .catch((err) => {
            setError(err);
            console.log(err);
          });
      }
    });
  };
  return (
    <div>
      <div className="overflow-x-auto ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-[#24253b]  dark:text-gray-400">
            <tr>
              <th></th>
              <th scope="col" className="py-4 px-7">
                Product Name
              </th>
              <th scope="col" className="py-4 px-7">
                Category{" "}
              </th>
              <th scope="col" className="py-4 px-7">
                Price
              </th>
              <th scope="col" className="py-4 px-7">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {wishListData.map((wish, i) => {
              return (
                <tr className=" bg-gray-200 dark:bg-[#292A3D] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100">
                  <th>{i + 1}</th>
                  <td className="py-8 px-6">{wish?.productName}</td>
                  <td className="py-8 px-6">{wish?.category}</td>
                  <td className="py-8 px-6">{wish?.ProductPrice} TK</td>
                  <td className="py-8 px-6">
                    <div className="flex gap-3">
                      <Link to={`/dashboard/wishlist/payment/${wish?._id}`}>
                        <button className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12">
                          <FaAmazonPay className="text-3xl"></FaAmazonPay>
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(wish?._id)}
                        className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12"
                      >
                        <MdDeleteForever className="text-3xl"></MdDeleteForever>
                      </button>
                    </div>
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

export default WishList;
