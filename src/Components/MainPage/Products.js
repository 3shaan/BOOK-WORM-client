import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import CategoryCard from './CategoryCard';


const Products = () => {

    const {data:categories=[], isLoading, isError } = useQuery({
        queryKey: ["category"],
        queryFn:async () => {
            const data = await axios.get("http://localhost:5000/category");
            return data.data;
        }
    })
console.log(categories);

    return (
      <div className="w-10/12  mx-auto">
        <h1 className="text-3xl text-center my-5 font-semibold">
          What genre Books we have 
        </h1>
        <div className="flex justify-between">
          {categories.map((Category) => (
            <CategoryCard Category={Category}></CategoryCard>
          ))}
        </div>
        {/* <div>
                <CategoryCard></CategoryCard>
           </div> */}
      </div>
    );
};

export default Products;