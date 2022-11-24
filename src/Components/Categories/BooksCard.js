import React from "react";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";

const BooksCard = ({ book }) => {
  const { images, title, author, price, seller_location, post_time , _id} = book;
  return (
    <div>
      <div className="card w-96 h-[520px] bg-base-200 shadow-xl">
        <figure className="p-5">
          <img className="rounded-lg h-52 w-80" src={images[0]} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>Author: {author}</p>
          <p className="font-semibold text-red-600">Price :{price} TK</p>
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
