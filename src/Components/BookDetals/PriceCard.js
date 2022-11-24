import React from "react";
import { GoLocation } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsFillPersonFill } from "react-icons/bs";

const PriceCard = ({ book }) => {
  const { seller_location, currier, post_time, seller_name } = book;

  return (
    <div className="bg-slate-200 px-5 py-3 rounded-lg w-80 text-lg space-y-4 font-semibold h-96">
      <h1 className="text-2xl text-center my-2">Seller Information </h1>
      <hr className="border-black mb-7" />
      <h1 className="flex gap-3 items-center">
        <BsFillPersonFill className="text-xl"></BsFillPersonFill>{" "}
        <span className="hover:underline">{seller_name}</span>
      </h1>
      <h1 className="flex gap-3 items-center">
        <GoLocation className="text-xl"></GoLocation>
        {seller_location}, Bangladesh
      </h1>
        <p className="flex gap-3 items-center">
          <CiDeliveryTruck className="text-2xl"></CiDeliveryTruck>{" "}
          <span >Currier : </span>
          {currier ? "Available" : "Unavailable"}
        </p>
        
  
      <p>Posted On : {post_time.slice(0, 10)}</p>
      <p>Product : Available</p>
    </div>
  );
};

export default PriceCard;
