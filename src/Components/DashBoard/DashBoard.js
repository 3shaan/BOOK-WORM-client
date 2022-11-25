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
  const { user:users } = useContext(authContext);

  const { data:user, isLoading, isError , error} = useQuery({
    queryKey: ["dashboard_user"],
    queryFn: async () => {
       const data = axios.get(`http://localhost:5000/users?email=${users?.email}`)
      return data;

    }
  })
  console.log(user?.data.result?.role)
  const userRole = user?.data.result?.role;
  if (isLoading) {
    return <Loading></Loading>
  }
  if (isError) {
    
    return <Error error={error}></Error>
  }
  return (
    <div>
      <Header></Header>
      <label
        htmlFor="dashboard-drawer"
        className=" text-2xl drawer-button lg:hidden"
      >
        <BsList></BsList>
      </label>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content flex flex-col ">
          {/* <!-- Page content here --> */}
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 bg-base-100 text-base-content">
            {/* <!-- Sidebar content here --> */}
            {userRole === "buyer" && (
              <li>
                <Link to={"/dashboard/myorder"}>My Order</Link>
              </li>
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
                <li>
                  <Link to={"/dashboard/reported_items"}>Reported Items</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
