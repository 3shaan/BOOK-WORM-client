import axios from "axios";
import React, { useContext } from "react";
import toast from "react-hot-toast";
import { authContext } from "../../Context/Context";

const BooksInfo = ({ book, setOpen }) => {
  const { user } = useContext(authContext);
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
    sold,
    _id
  } = book;
  console.log(sold)

  const handleWishList =() => {
    const bookdata = {
      buyerEmail: user?.email,
      buyerName: user?.displayName,
      productName: title,
      productPrice: price,
      category: genre,
      ProductId: _id,      
    }

    axios.post("http://localhost:5000/wishlist")
      .then(result => {
      console.log(result)
      })
      .catch(err => {
        toast.error(err.message)
        console.log(err)
      })
  }
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
          <button
            disabled={sold}
            htmlFor="my-modal-3"
            onClick={() => setOpen(true)}
            className="btn bg-red-600 border-red-700  hover:bg-transparent hover:text-black hover:border-red-700 duration-300 text-white w-48 rounded-lg hover:rounded-full"
          >
            Buy Now
          </button>
          <button
            onClick={handleWishList}
            className="btn bg-red-600 border-red-700  hover:bg-transparent hover:text-black hover:border-red-700 duration-300 text-white w-48 rounded-lg hover:rounded-full"
          >
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksInfo;
