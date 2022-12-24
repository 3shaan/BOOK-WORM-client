import React, { useContext } from "react";
import Header from "../Shared/Header";
import { BsList } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { authContext } from "../../Context/Context";
import Loading from "../Load & Error/Loading";
import Error from "../Load & Error/Error";

const DashBoard = () => {
  const { user: users } = useContext(authContext);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["dashboard_user"],
    queryFn: async () => {
      const data = axios.get(
        `https://book-worm-server.vercel.app/users?email=${users?.email}`
      );
      return data;
    },
  });
  console.log(user?.data.result?.role);
  const userRole = user?.data?.result?.role;
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    return <Error error={error}></Error>;
  }
  return (
    <div>
      <Header></Header>
      {/* <label
        htmlFor="dashboard-drawer"
        className=" text-2xl drawer-button lg:hidden"
      >
        <BsList></BsList>
      </label> */}
      <div className="grid md:grid-cols-5 ">
        <div className="col-span-4 order-2 overflow-scroll">
          <div className="flex flex-col ">
            {/* <!-- Page content here --> */}
            <Outlet></Outlet>
          </div>
        </div>
        <div className="order-1 w-screen md:w-80">
          {/* <label htmlFor="dashboard-drawer" className="drawer-overlay"></label> */}
          <div className="h-full p-3 space-y-2  bg-gray-100 text-gray-900 flex md:flex-col justify-around md:justify-start">
            <div className="flex  md:flex-row items-center p-2 space-x-4">
              <img
                src="https://source.unsplash.com/100x100/?portrait"
                alt=""
                className="w-12 h-12 rounded-full dark:bg-gray-200"
              />
              <div>
                <h2 className="text-lg font-semibold">{users?.displayName}</h2>
                <span className="flex items-center space-x-1 hover:underline cursor-pointer">
                  View profile
                </span>
              </div>
            </div>
            <div className="divide-y divide-gray-700">
              <ul className="menu p-4 md:w-80  text-base-content">
                {/* <!-- Sidebar content here --> */}
                {userRole === "buyer" && (
                  <>
                    <li>
                      <Link to={"/dashboard/myorder"}>My Order</Link>
                    </li>
                    <li>
                      <Link to={"/dashboard/wishlist"}>My WishList</Link>
                    </li>
                  </>
                )}
                {userRole === "seller" && (
                  <>
                    <li>
                      <Link to={"/dashboard/addproduct"}>Add Product</Link>
                    </li>
                    <li>
                      <Link to={"/dashboard/mybuyer"}>My Buyer</Link>
                    </li>
                    <li>
                      <Link to={"/dashboard/myproduct"}>My Product</Link>
                    </li>
                  </>
                )}

                {userRole === "admin" && (
                  <>
                    <li>
                      <Link to={"/dashboard/allbuyers"}>All Buyers</Link>
                    </li>
                    <li>
                      <Link to={"/dashboard/allsellers"}>All Sellers</Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
