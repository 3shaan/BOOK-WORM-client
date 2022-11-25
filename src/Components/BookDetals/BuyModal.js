import axios from "axios";
import React, { useContext, useState } from "react";
import { authContext } from "../../Context/Context";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useWrongToken } from "../Hooks/useWrongToken";


const BuyModal = ({ isOpen, setOpen, book, fetcher }) => {
  const { price, title, _id, images } = book;
  const { user, logOut } = useContext(authContext);
  const [error, setError] = useState('')

  const wrongToken = useWrongToken(error);

  const handleSubmit = (event) => {
    event.preventDefault();
    const phone = event.target.phone.value;
    const meeting_location = event.target.location.value;
    const buyProduct = {
      productName: title,
      ProductPrice: price,
      BuyerEmail: user?.email,
      buyerPhone: phone,
      buyerLocation: meeting_location,
      ProductId: _id,
      ProductImg: images[0],
    };
    axios
      .post(
        "http://localhost:5000/buy",
        {
          buyProduct,
        },
        {
          headers: {
            authorization: localStorage.getItem("token"),
          },
        }
      )
      .then((data) => {
        console.log(data);
        if (data?.data?.acknowledged === true) {
          toast.success("Product buy complete");
          setOpen(false);
          fetcher(0);
        }
      })
      .catch((err) => {
        console.log(err);
        setError(err)
      });
  };
  return (
    <div>
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className={`modal ${isOpen && "modal-open"}`}>
        <div className="modal-box relative  lg:w-7/12 max-w-5xl">
          <label
            onClick={() => setOpen(false)}
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h1 className="text-xl text-center font-semibold mb-5">
            For buy this Product submit this form
          </h1>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-col-1 lg:grid-cols-2">
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  defaultValue={user?.email}
                  disabled
                  placeholder="Email"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  type="text"
                  defaultValue={title}
                  disabled
                  placeholder="Item"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="text"
                  defaultValue={`${price} TK`}
                  disabled
                  placeholder="Price"
                  className="input input-bordered w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  required
                  className="input input-bordered focus:border-red-600 w-full max-w-xs"
                />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Meeting Location</span>
                </label>
                <input
                  type="text"
                  required
                  name="location"
                  placeholder="Location"
                  className="input input-bordered focus:border-red-600  w-full max-w-xs"
                />
              </div>
            </div>
            <div>
              <input
                type="submit"
                className="btn bg-red-600 hover:bg-transparent text-white hover:text-black border-red-700 rounded-lg hover:border-red-700 w-full mt-10 "
                value={"Buy The Product"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;
