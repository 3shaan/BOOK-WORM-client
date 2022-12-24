import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import BooksCard from "../Categories/BooksCard";
import Loading from "../Load & Error/Loading";

const EveryProducts = () => {
  const { data: products , isLoading, isError, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:5000/allproducts");
      // console.log(res)
      return res?.data;
    },
  });
    console.log(products);
    if (isLoading) {
        return <Loading/>
    }
  return (
    <div>
      <h1 className="text-3xl text-center mb-10">All Books</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {products.map((product) => (
          <BooksCard key={product._id} book={product} ></BooksCard>
        ))}
      </div>
    </div>
  );
};

export default EveryProducts;