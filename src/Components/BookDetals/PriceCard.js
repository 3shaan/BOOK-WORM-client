import React from "react";
import { GoLocation } from "react-icons/go";
import { CiDeliveryTruck } from "react-icons/ci";
import { BsFillPersonFill } from "react-icons/bs";
import { MdVerified } from "react-icons/md";

const PriceCard = ({ book }) => {
  const {
    seller_location,
    currier,
    post_time,
    seller_name,
    sold,
    user_verified,
  } = book;

  return (
    <div className="bg-slate-200 px-5 py-3 rounded-lg lg:w-80 lg:text-lg space-y-4 font-semibold h-96 ">
      <h1 className="text-2xl text-center my-2">Seller Information </h1>
      <hr className="border-black mb-7" />
      <div className="flex gap-3 items-center">
        <BsFillPersonFill className="text-4xl lg:text-xl"></BsFillPersonFill>
        <span className="hover:underline">{seller_name}</span>
        <span>
          {user_verified && <MdVerified className="text-blue-600"></MdVerified>}
        </span>
      </div>
      <h1 className="flex gap-3 items-center">
        <GoLocation className="text-4xl lg:text-xl"></GoLocation>
        {seller_location}, Bangladesh
      </h1>
      <p className="flex gap-3 items-center">
        <CiDeliveryTruck className="text-4xl lg:text-2xl"></CiDeliveryTruck>
        <span>Currier : </span>
        {currier ? "Available" : "Unavailable"}
      </p>

      <p>Posted On : {post_time.slice(0, 10)}</p>
      <p>
        Product :
        <span className="bg-red-600 rounded-lg px-2 text-white ml-3">
          {sold ? "Sold" : "Available"}
        </span>
      </p>
    </div>
  );
};

export default PriceCard;
