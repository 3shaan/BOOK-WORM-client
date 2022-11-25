import { useQuery } from "@tanstack/react-query";
import React from "react";
import { FaAmazonPay } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";

const MyProducts = () => {
    const { data:myProducts=[], isLoading, isError} = useQuery({
        queryKey: ["myProducts"],
        queryFn: async () => {
            const res = await fetch(
              `http://localhost:5000/products?email=${localStorage.getItem("email")}`
            );
            const data = await res.json();
            return data;
        }
    })
    console.log(myProducts);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Images</th>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
                          myProducts.map((product,i) => {
                              return (
                                <tr key={product?._id} className="hover">
                                      <th>{ i+1}</th>
                                  <td>
                                    <div className="avatar">
                                      <div className="w-24 rounded-full">
                                        <img
                                          src={product?.images[0]}
                                          alt="book Img"
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td>{product?.title}</td>
                                  <td>{product?.genre}</td>
                                  <td>{product?.price} TK</td>
                                  <td>
                                    <div className="flex gap-3">
                                      <button className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12">
                                        <BiEdit className="text-2xl"></BiEdit>
                                      </button>
                                      <button
                                       
                                        className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12"
                                      >
                                        <MdDeleteForever className="text-2xl"></MdDeleteForever>
                                      </button>
                                    </div>
                                  </td>
                                  <td> </td>
                                </tr>
                              );
                })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyProducts;
