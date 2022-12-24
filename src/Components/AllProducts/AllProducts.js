
import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const AllProducts = () => {
    return (
      <section className="w-10/12 mx-auto grid grid-cols-5">
        <div>
          <ul className="menu p-4 w-52  text-base-content">
            <li className="">
              <Link to={"/allproducts"}>All Books</Link>
            </li>
            <li>
              <Link to={"/allproducts/fantasy"}>Fantasy</Link>
            </li>
            <li>
              <Link to={"/allproducts/thriller"}>Thriller</Link>
            </li>
            <li>
              <Link to={"/allproducts/romance"}>Romance</Link>
            </li>
          </ul>
        </div>
        <div className="col-span-4">
          <Outlet></Outlet>
        </div>
      </section>
    );
};

export default AllProducts;