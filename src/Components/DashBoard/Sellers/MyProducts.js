import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import { FaAmazonPay } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { authContext } from "../../../Context/Context";
import axios from "axios";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { useWrongToken } from "../../Hooks/useWrongToken";
import Loading from "../../Load & Error/Loading";

const MyProducts = () => {
  const { user } = useContext(authContext);
  const [error1, setError] = useState("");

  const wrongToken = useWrongToken(error1);
  const {
    data: myProducts = [],
    isLoading,
    isError,
    refetch,
    error,
  } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      const res = await axios.get(
        `https://book-worm-server.vercel.app/products?email=${user?.email}`,
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
  console.log(myProducts);
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
          .delete(`https://book-worm-server.vercel.app/products/${id}`, {
            headers: {
              authorization: localStorage.getItem("token"),
            },
          })
          .then((res) => {
            refetch();
            Swal.fire("Deleted!", "Your file has been deleted.", "success");
          })
          .catch((err) => {
            console.log(err);
            toast.error(err.message);
            setError(err);
          });
      }
    });
  };

  const handleAdvertise = (id) => {
    console.log(id);
    axios
      .put(
        `https://book-worm-server.vercel.app/advertise/${id}`,
        {},
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        let timerInterval;
        Swal.fire({
          title: "Product advertising....",
          html: "It will close in <b></b> milliseconds.",
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
            if (res?.data?.modifiedCount === 0) {
              toast.error("This Product already advertised");
            }
            if (res?.data?.modifiedCount === 1) {
              toast.success("advertise successful");
            }
            refetch();

            console.log("I was closed by the timer");
          }
        });
      })
      .catch((err) => {
        // toast.error(err.message);
        console.log(err);
        setError(err);
      });
  };
  return (
    <div>
      <div className="overflow-x-auto">
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-[#24253b]  dark:text-gray-400">
            <tr>
              <th scope="col" className="py-4 px-7"></th>
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
                Category
              </th>
              <th scope="col" className="py-4 px-7">
                Available/Sold
              </th>
              <th scope="col" className="py-4 px-7">
                Advertise
              </th>
              <th scope="col" className="py-4 px-7">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product, i) => {
              return (
                <tr
                  key={product?._id}
                  className="hover bg-gray-200 dark:bg-[#292A3D] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                  <th className="py-4 px-6">{i + 1}</th>
                  <td className="py-4 px-6">
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={product?.images[0]} alt="book Img" />
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">{product?.title}</td>
                  <td className="py-4 px-6">{product?.genre}</td>
                  <td className="py-4 px-6">{product?.price} TK</td>
                  <td className="py-4 px-6">
                    {product?.sold ? (
                      <span className="text-xl text-red-600 font-semibold">
                        Sold
                      </span>
                    ) : (
                      <span className="text-xl text-blue-600 font-semibold">
                        Available
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {product?.sold ? (
                      <span className="text-xl text-red-600 font-semibold">
                        Sold
                      </span>
                    ) : (
                      <button
                        onClick={() => handleAdvertise(product?._id)}
                        className="btn  bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 "
                      >
                        Advertise
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDelete(product?._id)}
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

export default MyProducts;
