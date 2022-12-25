import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { set } from "react-hook-form";
import { FaAmazonPay } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../../../Context/Context";
import { useWrongToken } from "../../Hooks/useWrongToken";
import Loading from "../../Load & Error/Loading";

const MyOrders = () => {
  const { user } = useContext(authContext);
  console.log(user?.email);
  const [err, setError] = useState("");

  const wrongToken = useWrongToken(err);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await axios.get(
        `https://book-worm-server.vercel.app/buy?email=${user?.email}`,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      );
      return res?.data;
    },
  });
  console.log(products);

  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    console.log(error);
    setError(error);
  }

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
          .delete(`https://book-worm-server.vercel.app/buy/${id}`, {
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
          .catch((err) => console.log(err));
      }
    });
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-[#24253b]  dark:text-gray-400">
            <tr>
              <th></th>
              <th scope="col" className="py-4 px-7">
                Images
              </th>
              <th scope="col" className="py-4 px-7">
                Product Name
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
            {products.map((product) => {
              return (
                <tr
                  key={product?._id}
                  className="hover bg-gray-200 dark:bg-[#292A3D] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                  <th>1</th>
                  <td className="py-8 px-6">
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={product?.ProductImg} alt="book Img" />
                      </div>
                    </div>
                  </td>
                  <td className="py-8 px-6">{product?.productName}</td>
                  <td className="py-8 px-6">{product?.ProductPrice} TK</td>
                  <td className="py-8 px-6">
                    <div className="flex gap-3">
                      {product?.payment ? (
                        <button className="btn btn-sm bg-blue-600 hover:bg-transparent text-white hover:text-black border-blue-600 hover:border-blue-600 h-12 text-xs ">
                          paid
                        </button>
                      ) : (
                        <>
                          <Link to={`/dashboard/payment/${product?._id}`}>
                            <button className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12">
                              <FaAmazonPay className="text-2xl"></FaAmazonPay>
                            </button>
                          </Link>
                        </>
                      )}
                      <button
                        onClick={() => handleDelete(product?._id)}
                        className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12"
                      >
                        <MdDeleteForever className="text-2xl"></MdDeleteForever>
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

export default MyOrders;
