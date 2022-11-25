import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FaAmazonPay } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { authContext } from "../../../Context/Context";

const MyOrders = () => {
  const { user } = useContext(authContext);
  console.log(user?.email);

  const {
    data: products = [],
    isLoading,
    isError, refetch
  } = useQuery({
    queryKey: ["myOrders"],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/buy?email=${localStorage.getItem("email")}`
      );
      const data = await res.json();
      return data;
    },
  });
    console.log(products);
    

    const handleDelete = id => {
        console.log(id)
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
                axios.delete(`http://localhost:5000/buy/${id}`)
                    .then(data => {
                        console.log(data);
                        if (data.data.acknowledged) {
                            refetch();
                            Swal.fire(
                              "Deleted!",
                              "Your file has been deleted.",
                              "success"
                            );
                        } 
                        
                    })
                    .catch(err => console.log(err));
            
          }
        });
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => {
              return (
                <tr key={product?._id} className="hover">
                  <th>1</th>
                  <td>
                    <div className="avatar">
                      <div className="w-24 rounded-full">
                        <img src={product?.ProductImg} alt="book Img" />
                      </div>
                    </div>
                  </td>
                  <td>{product?.productName}</td>
                  <td>{product?.ProductPrice} TK</td>
                  <td>
                    <div className="flex gap-3">
                      <button className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12">
                        <FaAmazonPay className="text-3xl"></FaAmazonPay>
                      </button>
                      <button onClick={()=>handleDelete(product?._id)} className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12">
                        <MdDeleteForever className="text-3xl"></MdDeleteForever>
                      </button>
                    </div>
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

export default MyOrders;
