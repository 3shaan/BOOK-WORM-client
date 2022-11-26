import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext } from "react";
import { FaAmazonPay } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import { authContext } from "../../../Context/Context";
import Loading from "../../Load & Error/Loading";

const WishList = () => {
  const { user } = useContext(authContext);
  const {data:wishListData , isLoading , refetch} = useQuery({
    queryKey: ['wishlist'],
    queryFn: async () => {
      const data = await axios.get(
        `http://localhost:5000/wishlist?email=${user?.email}`
      );
      return data.data;
    }
  })
  if (isLoading) {
    return <Loading></Loading>
  }
  console.log(wishListData);

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
            axios
              .delete(`http://localhost:5000/wishlist/${id}`)
              .then((data) => {
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
              .catch((err) => console.log(err));
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
              <th>Product Name</th>
              <th>Category </th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              wishListData.map((wish,i) => {
                return (
                  <tr className="hover">
                    <th>{i + 1}</th>
                    <td>{wish?.productName}</td>
                    <td>{wish?.category}</td>
                    <td>{wish?.productPrice} TK</td>
                    <td>
                      <div className="flex gap-3">
                        <button className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 h-12">
                          <FaAmazonPay className="text-3xl"></FaAmazonPay>
                        </button>
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
              })
           }

           

           
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WishList;
