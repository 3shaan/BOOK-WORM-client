import React from 'react';
import Lottie from "react-lottie";
import { Link } from 'react-router-dom';
import books from '../../images/books.json'

const Banner = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: books,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
    return (
      <div>
        <div className="hero min-h-[600px] ">
          <div className="hero-content flex-col lg:flex-row-reverse gap-20">
            {/* <img
              src="https://cdn.pixabay.com/photo/2015/11/19/21/11/book-1052014_960_720.jpg"
              className="rounded-lg shadow-2xl lg:w-5/12"
              alt=""
            /> */}
            <div className=" lg:w-8/12">
              <Lottie options={defaultOptions}></Lottie>
            </div>

            <div className="">
              <h1 className="text-5xl font-semibold text-gray-700">
                Read More And Make Success The Result Of Perfection.
              </h1>
              <p className="py-6 text-gray-600">
                Sell the book that you already read, make the opportunity for
                other to read that books. You can also buy new one from here.
              </p>
              <Link to={'/allproducts'}>
                <button className="btn bg-red-600 border-red-700  hover:bg-transparent hover:text-black hover:border-red-700 duration-300 text-white">
                  See All Books
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Banner;