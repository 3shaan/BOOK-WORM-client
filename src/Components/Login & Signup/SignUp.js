import React from "react";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

    const onSubmit = (data) => {
        console.log(data);
  };
  return (
    <section>
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://img.freepik.com/free-vector/sign-up-concept-illustration_114360-7875.jpg?w=740&t=st=1669293819~exp=1669294419~hmac=116af89a02024d774db61291614d837e3467304593ec7f8b42b6cebcf82ece88"
              className="lg:w-9/12 lg:ml-10"
              alt="login"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <div className="flex flex-row items-center justify-center lg:justify-start">
              <p className="text-lg mb-0 mr-4">Sign up with</p>
              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block p-3 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out mx-1 hover:-translate-y-1"
              >
                <FaGoogle className="text-lg"></FaGoogle>
              </button>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className=" inline-block p-3 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out mx-1 hover:-translate-y-1"
              >
                <FaFacebookF className="text-lg"></FaFacebookF>
              </button>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="inline-block p-3 bg-red-600 text-white font-medium text-xs leading-tight uppercase rounded-full shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out mx-1 hover:-translate-y-1"
              >
                <FaGithub className="text-lg"></FaGithub>
              </button>
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6">
                <input
                  {...register("name", { required: true })}
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Full Name"
                />
                {errors.name && (
                  <span className="text-red-500">Name is required</span>
                )}
              </div>
              <div className="mb-6">
                <input
                  {...register("email", { required: true })}
                  type="email"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                />
                {errors.email && (
                  <span className="text-red-500">Email is required</span>
                )}
              </div>

              {/* <!-- Password input -->F */}
              <div className="mb-6">
                <input
                  {...register("password", { required: true })}
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                />
                {errors.password && (
                  <span className="text-red-500">Password is required</span>
                )}
              </div>

              <div className="flex gap-5 items-center mb-6">
                <p className="text-lg font-semibold">What are you?</p>
                <select
                  {...register("option", { required: true })}
                  className="select select-bordered w-full max-w-xs"
                  required
                >
                  <option value={"buyer"}>Buyer</option>
                  <option value={"seller"}>Seller</option>
                </select>
              </div>

              <div className="text-center lg:text-left">
                <input
                  type="Submit"
                  className="inline-block px-7 py-3 bg-red-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-red-700 hover:shadow-lg focus:bg-red-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-800 active:shadow-lg transition duration-150 ease-in-out"
                  value={"Login"}
                  readOnly
                />

                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Already have an account?
                  <Link
                    to={"/login"}
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;