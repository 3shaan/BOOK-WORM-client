import axios from "axios";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { authContext } from "../../Context/Context";
import { useWrongToken } from "../Hooks/useWrongToken";
import Error from "../Load & Error/Error";

const BooksInfo = ({ book, setOpen }) => {
  const { user } = useContext(authContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const wrongToken = useWrongToken(error);
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
    _id,
  } = book;
  console.log(sold);

  const handleWishList = () => {
     if (!user?.uid) {
       toast.error("Please Login to Add Products in WishList");
        return navigate("/login");
     }
    const bookData = {
      buyerEmail: user?.email,
      buyerName: user?.displayName || "",
      productName: title,
      ProductPrice: price,
      category: genre,
      ProductId: _id,
    };

    axios
      .post(
        `https://book-worm-server.vercel.app/wishlist?id=${_id}&email=${user?.email}`,
        bookData,
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((result) => {
        console.log(result);
        if (result.data.acknowledged) {
          toast.success("added to WishList successful");
        }
        if (result?.data?.message) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${result?.data?.message}.`,
          });
          // toast.error(result?.data?.message);
        }
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message);
        setError(err);
        console.log(err);
      });
  };
  return (
    <div>
      <div className="space-y-3 text-lg">
        <h1 className="text-2xl font-semi-bold">
          <span className="font-bold text-lg md:text-3xl">Book Name :</span>{" "}
          {title}
        </h1>
        <p className="text-xl">Author Name : {author}</p>
        <p>Category/Genre : {genre}</p>
        <p className="text-5xl text-red-700 italic  py-10">৳ {price}</p>
        <p>Condition : {condition}</p>
        <p>Original Price : ৳ {Original_price} </p>
        <p>Used : {uses}</p>
        <div className="flex gap-5 md:gap-10 pt-10">
          <button
            disabled={sold}
            htmlFor="my-modal-3"
            onClick={() => setOpen(true)}
            className="btn-sm md:btn rounded-full bg-red-600 md:bg-red-600 border-red-700 md:border-red-700  hover:bg-transparent md:hover:bg-transparent hover:text-black md:hover:text-black hover:border-red-700 md:hover:border-red-700 duration-300 text-white md:text-white mt-2 w-48"
          >
            Buy Now
          </button>
          <button
            disabled={sold}
            onClick={handleWishList}
            className="btn-sm md:btn rounded-full bg-red-600 md:bg-red-600 border-red-700 md:border-red-700  hover:bg-transparent md:hover:bg-transparent hover:text-black md:hover:text-black hover:border-red-700 md:hover:border-red-700 duration-300 text-white md:text-white mt-2 w-48"
          >
            Add to wishlist
          </button>
        </div>
      </div>
    </div>
  );
};

export default BooksInfo;
