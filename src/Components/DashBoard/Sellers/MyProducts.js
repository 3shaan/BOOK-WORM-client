import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FaAmazonPay } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { authContext } from "../../../Context/Context";

const MyProducts = () => {
  const { user } = useContext(authContext);
  const {
    data: myProducts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["myProducts"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/products?email=${user?.email}`
      );
      const data = await res.json();
      return data;
    },
  });
  console.log(myProducts);

  const handleAdvertise = id => {
    console.log(id)
  }
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
              <th>Available/Sold</th>
              <th>Advertise</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {myProducts.map((product, i) => {
              return (
                <tr key={product?._id} className="hover">
                  <th>{i + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={product?.images[0]} alt="book Img" />
                      </div>
                    </div>
                  </td>
                  <td>{product?.title}</td>
                  <td>{product?.genre}</td>
                  <td>{product?.price} TK</td>
                  <td>
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
                  <td>
                    {product?.sold ? (
                      <span className="text-xl text-red-600 font-semibold">
                        Sold
                      </span>
                    ) : (
                      <button onClick={()=>handleAdvertise(product?._id)} className="btn  bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600">
                        Advertise
                      </button>
                    )}
                  </td>
                  <td>
                    <button className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12">
                      <MdDeleteForever className="text-2xl"></MdDeleteForever>
                    </button>
                  </td>
                  <td> </td>
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
