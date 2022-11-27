import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import Loading from "../Load & Error/Loading";
import CategoryCard from "./CategoryCard";

const Products = () => {
  const {
    data: categories = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["category"],
    queryFn: async () => {
      const data = await axios.get(
        "https://book-worm-server.vercel.app/category"
      );
      return data.data;
    },
  });
  console.log(categories);

  if (isLoading) {
    return <Loading></Loading>;
  }
  return (
    <div className="w-10/12  mx-auto">
      <h1 className="text-3xl text-center my-5 font-semibold">
        What genre Books we have
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {categories.map((Category) => (
          <CategoryCard key={Category?.id} Category={Category}></CategoryCard>
        ))}
      </div>
      {/* <div>
                <CategoryCard></CategoryCard>
           </div> */}
    </div>
  );
};

export default Products;
