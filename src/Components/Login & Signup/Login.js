import React, { useContext } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { FaFacebook, FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { authContext } from "../../Context/Context";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {
  const { login, googleLogIn } = useContext(authContext);
  const location = useLocation();

  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    axios.get(`http://localhost:5000/users?email=${email}`)
      .then(data => {
        const storedEmail =data?.data?.result?.email;
        console.log(data?.data?.token);
        console.log(data?.data?.result?.email);
        if (storedEmail === email) {
          login(email, password)
            .then((result) => {
              localStorage.setItem("token", data?.data?.token);
              toast.success('login successfully');
              navigate(from, { replace: true });
               
            })
            .catch((err) => console.log(err));
        }
      })
      .catch(err => console.log(err));
    
    console.log(email, password)
  }

  // google log in

  const handleGoogle = () => {
    googleLogIn()
      .then((res) => {
        console.log(res);
        const user = res.user;
        const data = {
          email: user?.email,
          name: user?.displayName,
          role: "buyer",
        };

        axios
          .get(`http://localhost:5000/google_user?email=${user?.email}`)
          .then((data2) => {
            console.log(data2);
            const storedEmail = data2?.data?.result?.email;
            if (storedEmail === user?.email) {
              toast.success("Sign up successful");
              localStorage.setItem("token", data2?.data?.token);
              navigate("/", { replace: true });
              return;
            }
            axios
              .post("http://localhost:5000/users", {
                data,
              })
              .then((user) => {
                if (user?.data?.result?.acknowledged === true) {
                  toast.success("Sign up successful");
                  localStorage.setItem("token", user?.data?.token);
                  navigate("/", { replace: true });
                }
                console.log(user);
              })
              .catch((err) => {
                console.log(err);
                // setIsError(err.message);
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  
  return (
    <section>
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="login"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <div className="flex flex-row items-center justify-center lg:justify-start space-x-1">
              <p className="text-lg mb-0 mr-4">Sign in with</p>
              <button
                onClick={handleGoogle}
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="btn bg-red-600 hover:bg-transparent text-white hover:text-black border-red-700 rounded-full hover:border-red-700  hover:-translate-y-1"
              >
                <FaGoogle className="text-lg"></FaGoogle>
              </button>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="btn bg-red-600 hover:bg-transparent text-white hover:text-black border-red-700 rounded-full hover:border-red-700  hover:-translate-y-1"
              >
                <FaFacebookF className="text-lg"></FaFacebookF>
              </button>

              <button
                type="button"
                data-mdb-ripple="true"
                data-mdb-ripple-color="light"
                className="btn bg-red-600 hover:bg-transparent text-white hover:text-black border-red-700 rounded-full hover:border-red-700  hover:-translate-y-1"
              >
                <FaGithub className="text-lg"></FaGithub>
              </button>
            </div>

            <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
              <p className="text-center font-semibold mx-4 mb-0">Or</p>
            </div>
            <form onSubmit={handleSubmit}>
              {/* <!-- Email input --> */}
              <div className="mb-6">
                <input
                  name="email"
                  type="text"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                />
              </div>

              {/* <!-- Password input -->F */}
              <div className="mb-6">
                <input
                  name="password"
                  type="password"
                  className="form-control block w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-red-600 focus:outline-none"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                />
              </div>

              <div className="flex justify-between items-center mb-6">
                <div className="form-group form-check">
                  <input
                    type="checkbox"
                    className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-red-600 checked:border-red-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    id="exampleCheck2"
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    for="exampleCheck2"
                  >
                    Remember me
                  </label>
                </div>
                <a href="#!" className="text-gray-800">
                  Forgot password?
                </a>
              </div>

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="btn bg-red-600 hover:bg-transparent text-white hover:text-black border-red-700 rounded-lg hover:border-red-700 w-32"
                >
                  Login
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link
                    to={"/signup"}
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    Register
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

export default Login;
