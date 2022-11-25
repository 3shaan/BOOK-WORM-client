import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { MdDeleteForever } from "react-icons/md";
import Swal from "sweetalert2";
import Loading from "../../Load & Error/Loading";

const AllBuyers = () => {
  const { data: buyers , isLoading} = useQuery({
    queryKey: ["allBuyers"],
    queryFn: async () => {
      const res = await fetch("http://localhost:5000/users_type?type=buyer");
      const data = await res.json();
      return data;
    },
  });
  console.log(buyers);
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleDelete = id => {
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
        axios.delete(`http://localhost:5000/users/${id}`)
          .then(result => {
            console.log(result);
            if (result.data.acknowledged) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }
              
        })
        
      }
    });
    console.log(id)
    


  }



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
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer) => {
              return (
                <tr key={buyer?._id} className="hover">
                  <th>2</th>
                  <td>{buyer?.name}</td>
                  <td>{buyer?.email}</td>

                  <td>
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
