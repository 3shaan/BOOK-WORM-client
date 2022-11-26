import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import React, { useEffect } from 'react';

const PaymentModal = ({ productData, open, setOpen }) => {
    console.log(productData)
    const { ProductPrice } = productData;

    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        axios
          .post("http://localhost:5000/payment", ProductPrice)
          .then((data) => {
            console.log(data);
          })
          .catch((err) => console.log(err));
    },[ProductPrice])

    const handleSubmit = async (event) => {
         event.preventDefault();

         if (elements == null) {
           return;
         }
    }

  return (
    open && (
      <div>
        <input type="checkbox" id="my-modal-3" className="modal-toggle" />
        <div className={`modal ${open && "modal-open"}`}>
          <div className="modal-box relative">
            <label
              onClick={() => setOpen(false)}
              htmlFor="my-modal-3"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
            <div className="text-lg font-bold text-center">
              <p>Payment</p>
              <p>Product: {productData.productName}</p>
              <p>Price : {productData.ProductPrice} TK</p>
            </div>
            <div className=''>
              <form onSubmit={handleSubmit}>
                <div className='my-3 '>
                  <CardElement />
                </div>
                <button
                  className="btn"
                  type="submit"
                  disabled={!stripe || !elements}
                >
                  Pay
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default PaymentModal;