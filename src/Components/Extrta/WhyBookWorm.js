import React from 'react';
import category from '../../images/category.svg'
import products from '../../images/products.svg'
import price2 from '../../images/price2.svg'
import price from '../../images/price.svg'

const WhyBookWorm = () => {
    return (
      <div className=" space-y-10 bg-gray-200 dark:bg-[#24253b] p-3 rounded-md py-10">
        <h1 className="text-3xl text-gray-700 dark:text-gray-100 text-center font-semibold my-4">
          Why Buy & Sell Books With BookWorm?
        </h1>
        <div className="flex gap-5 flex-col md:flex-row lg:justify-between w-10/12 mx-auto text-gray-600 dark:text-gray-100">
          {/* <div className='flex gap-3'>
                    <img className='w-12' src={category} alt="" />
                    <p>Choose you Products with Category wise</p>
                </div> */}
          <div className="flex gap-3">
            <img className="w-16" src={products} alt="" />
            <p className="text-xl">
              <span className="text-red-500 font-semibold">Choose</span> you
              Products <br /> with Category wise
            </p>
          </div>
          <div className="flex gap-3">
            <img className="w-16" src={price} alt="" />
            <p className="text-xl">
              <span className="text-red-500 font-semibold">Manage</span> Sell &
              Buy <br /> in one place
            </p>
          </div>
          <div className="flex gap-3">
            <img className="w-16" src={price2} alt="" />
            <p className="text-xl">
              <span className="text-red-500 font-semibold">Easy</span> Online{" "}
              <br /> Payment method
            </p>
          </div>
        </div>
      </div>
    );
};

export default WhyBookWorm;