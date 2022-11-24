import React from "react";
import Header from "../Shared/Header";
import { BsList } from "react-icons/bs";
import { Link, Outlet } from "react-router-dom";

const DashBoard = () => {
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
            <li>
              <Link to={'/dashboard/myorder'}>My Order</Link>
            </li>
            <li>
              <a>Sidebar Item 2</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
