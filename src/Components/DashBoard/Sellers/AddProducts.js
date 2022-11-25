import { getValue } from '@testing-library/user-event/dist/utils';
import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { authContext } from '../../../Context/Context';

const AddProducts = () => {
  const { user } = useContext(authContext);
  console.log(user.email)
  const [img, setImg] = useState('');
   const {
     register,
     handleSubmit,
     formState: { errors },
  } = useForm();
  
  const onSubmit = async (data) => {
    console.log(img.target.files[0])
    const image = img.target.files[0];
     const formData = new FormData();
    formData.append("image", image);
    const uploadImg = await axios.post(
      "https://api.imgbb.com/1/upload?key=7393967092b740dbb7156b576663d2f7"
      , formData)
    console.log(uploadImg?.data?.data?.url);
    const images = [uploadImg?.data?.data?.url];
    const post_time = new Date();
    const uploadProduct = { ...data, images, post_time };

    const uploadData = await axios.post("http://localhost:5000/books", uploadProduct);
    if (uploadData.data.acknowledged) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Product added Successful",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(uploadData);
    console.log(uploadProduct);
  };
    return (
      <div>
        <h1 className="text-2xl font-semibold text-center mt-5 mb-10">
          Add a Product
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Product Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Here give all the details about your Product. <br /> Every
                    field must be Required.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="shadow sm:overflow-hidden sm:rounded-md">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="form-control w-full max-w-xs ml-3">
                      <label className="label">
                        <span className="label-text">Product Name</span>
                      </label>
                      <input
                        {...register("title", { required: true })}
                        type="text"
                        placeholder="Book Name"
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs ml-3">
                      <label className="label">
                        <span className="label-text">Author Name</span>
                      </label>
                      <input
                        {...register("author", { required: true })}
                        type="text"
                        placeholder="Author Name"
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs ml-3">
                      <label className="label">
                        <span className="label-text">Genre</span>
                      </label>
                      <select
                        {...register("genre", { required: true })}
                        className="select select-bordered w-full max-w-xs rounded-lg"
                      >
                        <option value={"Fantasy"}>Fantasy</option>
                        <option value={"Thriller"}>Thriller</option>
                        <option value={"Romance"}>Romance</option>
                      </select>
                    </div>
                    <div className="form-control w-full max-w-xs ml-3">
                      <label className="label">
                        <span className="label-text">price</span>
                      </label>
                      <input
                        {...register("price", { required: true })}
                        type="text"
                        placeholder="Product Price"
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs ml-3">
                      <label className="label">
                        <span className="label-text">Original Price</span>
                      </label>
                      <input
                        {...register("Original_price", { required: true })}
                        type="text"
                        placeholder="Original Price"
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs ml-3">
                      <label className="label">
                        <span className="label-text">
                          How many days you used the product?
                        </span>
                      </label>
                      <input
                        {...register("uses", { required: true })}
                        type="text"
                        placeholder="Month/Year"
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs ml-3">
                      <label className="label">
                        <span className="label-text">
                          Hows the Product condition?
                        </span>
                      </label>
                      <input
                        {...register("condition", { required: true })}
                        type="text"
                        placeholder="good/bad"
                        className="input input-bordered w-full max-w-xs rounded-lg"
                      />
                    </div>
                    <div className="form-control w-full max-w-xs ml-3">
                      <label className="label">
                        <span className="label-text">
                          Upload an images of the Product
                        </span>
                      </label>
                      <input
                        onChange={(data) => setImg(data)}
                        type="file"
                        className="file-input file-input-bordered w-full max-w-xs rounded-lg file-input-error"
                      />
                    </div>
                  </div>
                  <div className="form-control w-full pr-5 ml-3">
                    <label className="label">
                      <span className="label-text">
                        Write Product Description
                      </span>
                    </label>
                    <textarea
                      {...register("desc", { required: true })}
                      className="textarea textarea-bordered rounded-lg"
                      placeholder="Product Description"
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden sm:block" aria-hidden="true">
            <div className="py-5">
              <div className="border-t border-gray-200" />
            </div>
          </div>

          <div className="mt-10 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="md:col-span-1">
                <div className="px-4 sm:px-0">
                  <h3 className="text-lg font-medium leading-6 text-gray-900">
                    Personal Information
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    Use a permanent address where you can receive mail.
                  </p>
                </div>
              </div>
              <div className="mt-5 md:col-span-2 md:mt-0">
                <div className="overflow-hidden shadow sm:rounded-md">
                  <div className="bg-white px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="first-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Full Name
                        </label>
                        <input
                          {...register("seller_name", { required: true })}
                          type="text"
                          placeholder="Full Name"
                          className="input input-bordered w-full max-w-xs rounded-lg"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="last-name"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Phone Number
                        </label>
                        <input
                          {...register("seller_phone", { required: true })}
                          type="text"
                          placeholder="Phone Number"
                          className="input input-bordered w-full max-w-xs rounded-lg"
                        />
                      </div>

                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email address
                        </label>
                        <input
                          {...register("seller_email", {
                            required: true,
                            value: `${user?.email}`,
                          })}
                          type="text"
                          placeholder="Email Address"
                          className="input input-bordered w-full max-w-xs rounded-lg"
                        />
                      </div>
                      <div className="col-span-6 sm:col-span-">
                        <label
                          htmlFor="email-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Location
                        </label>
                        <input
                          {...register("seller_location", { required: true })}
                          type="text"
                          placeholder="Location"
                          className="input input-bordered w-full max-w-xs rounded-lg"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>

        <div className="hidden sm:block" aria-hidden="true">
          <div className="py-5">
            <div className="border-t border-gray-200" />
          </div>
        </div>
      </div>
    );
};

export default AddProducts;