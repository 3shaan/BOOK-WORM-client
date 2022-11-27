import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useContext, useState } from "react";
import { authContext } from "../../../Context/Context";
import { useWrongToken } from "../../Hooks/useWrongToken";
import Loading from "../../Load & Error/Loading";

const MyBuyers = () => {
  const { user } = useContext(authContext);
  const [err, setError] = useState("");

  const wrongToken = useWrongToken(err);
  const {
    data: buyers,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["myBuyer"],
    queryFn: async () => {
      const res = await axios.get(
        `https://book-worm-server.vercel.app/buyer?email=${user?.email}`,
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
    setError(error);
  }

  console.log(buyers);
  return (
    <div>
      <h1 className="text-2xl font-semibold text-center my-5">My Buyer</h1>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th> Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer) => {
              return (
                <tr key={buyer._id} className="hover">
                  <th>2</th>
                  <td>{buyer?.productName}</td>
                  <td>{buyer?.BuyerName}</td>
                  <td>{buyer?.BuyerEmail}</td>
                  <td>{buyer?.buyerPhone}</td>
                  <td>{buyer?.buyerLocation}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyBuyers;
