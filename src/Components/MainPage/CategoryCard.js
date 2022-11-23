import React from 'react';

const CategoryCard = ({ Category }) => {
  return (
    <div className="mb-10">
      <div className={`card w-96 h-44  shadow-xl ${Category?.color}`}>
        <div className="card-body">
          <img className="w-24 mx-auto" src={Category?.img} alt="" />
          <h2 className="text-center text-xl text-white">{Category?.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;