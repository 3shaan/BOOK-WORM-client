import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import Error from "../Load & Error/Error";
import Loading from "../Load & Error/Loading";
import BlogsModal from "./BlogsModal";

const Blogs = () => {
  const [isOpen, setOpen] = useState(false);
  const [blogData, setBlogData] = useState("");
  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const res = await axios.get("https://book-worm-server.vercel.app/blogs");
      return res?.data;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
    }
    if (isError) {
        <Error error={error}></Error>
    }
  // console.log(data)
  const handleModal = (blog) => {
    setBlogData(blog);
    setOpen(true);
  };
  return (
    <div className="w-10/12 mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {blogs.map((blog) => {
          return (
            <div
              key={blog?._id}
              className="card w-96 bg-gray-200 dark:bg-[#24253b] text-gray-900 dark:text-gray-100 shadow-xl"
            >
              <figure>
                <img src={blog?.img} alt="pics" />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{blog?.question}</h2>
                <p>{blog?.ans.slice(0, 100)}....</p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleModal(blog)}
                    className="btn bg-red-600 hover:bg-transparent text-white hover:text-black border-red-700 rounded-lg hover:border-red-700"
                  >
                    Read More
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <BlogsModal
        setOpen={setOpen}
        isOpen={isOpen}
        blogData={blogData}
      ></BlogsModal>
    </div>
  );
};

export default Blogs;
