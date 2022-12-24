import React from 'react';
import { Link } from 'react-router-dom';

const CategoryCard = ({ Category }) => {
  const { name, img, color, _id} = Category;
  return (
    <div className="mb-10">
      <Link to={`/category/${name}`}>
        <div
          className={`card w-96 h-44  shadow-xl bg-blue-500 transform hover:-translate-y-1 duration-200 ease-in-out`}
        >
          <div className="card-body">
            <img className="w-24 mx-auto" src={img} alt="" />
            <h2 className="text-center text-xl text-white">{name}</h2>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CategoryCard;