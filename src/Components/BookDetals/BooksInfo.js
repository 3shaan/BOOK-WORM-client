import React from "react";

const BooksInfo = ({ book, setOpen }) => {
  const {
    post_time,
    title,
    seller_location,
    author,
    price,
    condition,
    Original_price,
    genre,
    uses,
    sold
  } = book;
  console.log(sold)
  return (
    <div>
      <div className="space-y-3">
        <h1 className="text-2xl font-semi-bold">
          <span className="font-bold text-3xl">Book Name :</span> {title}
        </h1>
        <p className="text-xl">Author Name : {author}</p>
        <p>Category/Genre : {genre}</p>
        <p className="text-5xl text-red-700 italic  py-10">৳ {price}</p>
        <p>Condition : {condition}</p>
        <p>Original Price : ৳ {Original_price} </p>
        <p>Used : {uses}</p>
        <div className="flex gap-10 pt-10">
          <button disabled={sold}
            htmlFor="my-modal-3"
            onClick={() => setOpen(true)}
            className="btn bg-red-600 border-red-700  hover:bg-transparent hover:text-black hover:border-red-700 duration-300 text-white w-48 rounded-lg hover:rounded-full"
          >
            Buy Now
          </button>
          <button className="btn bg-red-600 border-red-700  hover:bg-transparent hover:text-black hover:border-red-700 duration-300 text-white w-48 rounded-lg hover:rounded-full">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksInfo;
