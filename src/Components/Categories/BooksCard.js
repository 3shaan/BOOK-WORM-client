import React from "react";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const BooksCard = ({ book }) => {
  const {
    images,
    title,
    author,
    price,
    seller_location,
    post_time,
    _id,
    seller_name,
    user_verified,
    payment
  } = book;
  return (
    <div className={`${payment && 'hidden'}`}>
      <div className="card w-96 h-[520px] bg-base-200 shadow-xl transform hover:-translate-y-1 duration-200 ease-in-out">
        <figure className="p-5">
          <img className="rounded-lg h-52 w-80" src={images[0]} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>Author: {author}</p>
          <p className="font-semibold text-red-600">Price :{price} TK</p>
          <div>
            <p className="flex gap-1 items-center">
              Seller: {seller_name}
              {user_verified && (
                <MdVerified className="text-blue-600"></MdVerified>
              )}
            </p>
          </div>

          <div className="flex justify-between  mr-[-60px]">
            <p>{seller_location}, Bangladesh</p>
            <p>
              <ReactTimeAgo date={post_time}></ReactTimeAgo>
            </p>
          </div>
          <Link to={`/books/${_id}`}>
            <button className="btn bg-red-600 border-red-700  hover:bg-transparent hover:text-black hover:border-red-700 duration-300 text-white mt-2 w-full">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BooksCard;
