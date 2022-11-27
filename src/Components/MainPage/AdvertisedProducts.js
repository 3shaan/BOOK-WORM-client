import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import BooksCard from "../Categories/BooksCard";
import Loading from "../Load & Error/Loading";

const AdvertisedProducts = () => {
  const {
    data: advertised,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["advertised"],
    queryFn: async () => {
      const data = await axios.get(
        "https://book-worm-server.vercel.app/advertised"
      );
      return data?.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  console.log(advertised);
  return (
    advertised?.length > 0 && (
      <div className="w-10/12 mx-auto">
        <h1 className="text-3xl text-center font-semibold text-gray-700 my-5">
          Our HighLighted Product
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {advertised.map((add) => (
            <BooksCard book={add}></BooksCard>
          ))}
        </div>
      </div>
    )
  );
};

export default AdvertisedProducts;
