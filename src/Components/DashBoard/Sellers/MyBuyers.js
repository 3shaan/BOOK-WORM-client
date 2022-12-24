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
      <h1 className="text-2xl font-semibold text-center my-5 text-gray-900 dark:text-gray-100">
        My Buyer
      </h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-400 dark:bg-[#24253b]  dark:text-gray-400">
            <tr>
              <th scope="col" className="py-4 px-7"></th>
              <th scope="col" className="py-4 px-7">
                Product name
              </th>
              <th scope="col" className="py-3 px-6">
                Name
              </th>
              <th scope="col" className="py-3 px-6">
                Email
              </th>
              <th scope="col" className="py-3 px-6">
                Phone
              </th>
              <th scope="col" className="py-3 px-6">
                <span>Location</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {buyers.map((buyer, i) => {
              return (
                <tr
                  key={buyer._id}
                  className="hover bg-gray-200 dark:bg-[#292A3D] border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
                >
                  <th>{i + 1}</th>
                  <td className="py-8 px-6">{buyer?.productName}</td>
                  <td className="py-8 px-6">{buyer?.BuyerName}</td>
                  <td className="py-8 px-6">{buyer?.BuyerEmail}</td>
                  <td className="py-8 px-6">{buyer?.buyerPhone}</td>
                  <td className="py-8 px-6">{buyer?.buyerLocation}</td>
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
