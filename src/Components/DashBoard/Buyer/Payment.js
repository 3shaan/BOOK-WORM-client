import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import Loading from "../../Load & Error/Loading";

const Payment = () => {
  const productData = useLoaderData();

  const {
    ProductPrice,
    BuyerEmail,
    ProductId,
    buyerPhone,
    sellerEmail,
    productName,
  } = productData;
  // console.log(productData);
  const stripe = useStripe();
  const elements = useElements();
  const[trasId, setTransId] = useState('')

  const {
    data: clientSecret,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["payment"],
    queryFn: async () => {
      const { data } = await axios.post("http://localhost:5000/payment", {
        ProductPrice,
      });
      return data?.clientSecret;
    },
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  // console.log(error)
  // console.log(clientSecret);

  const handleSubmit = async (event) => {
    event.preventDefault();
    //timer
      let timerInterval;
      Swal.fire({
        title: "Payment Processing......!",
        html: "It will close in <b></b> milliseconds.",
        timer: 3000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    //main process start
    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log(error);
    } 

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: productData?.buyerEmail,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError.message);
      return;
    }
    console.log(paymentIntent);
    if (paymentIntent.status === "succeeded") {
      const payInfo = {
        sellerEmail,
        BuyerEmail,
        ProductId,
        PaymentPrice: ProductPrice,
        transactionID: paymentIntent?.id,
        productName,
      };
      axios.post("http://localhost:5000/payment_success",payInfo)
        .then(result => {
          console.log(result)
          setTransId(paymentIntent?.id);
          if (result?.data?.acknowledged) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Payment Successfully",
              showConfirmButton: false,
              timer: 1500,
            });
          }
        })
      .catch(err=>console.log(err))
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card w-96 bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="text-lg font-bold text-center">
            <p>Payment</p>
            <p>Product: {productData.productName}</p>
            <p>Price : {productData.ProductPrice} TK</p>
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="my-3 ">
                <CardElement />
              </div>
              <button
                className="btn btn-sm bg-red-600 hover:bg-transparent text-white hover:text-black border-red-600 hover:border-red-600 w-full mt-5"
                type="submit"
                disabled={!stripe || !elements}
              >
                Pay
              </button>
            </form>
          </div>
          <div>{trasId && <p>transactionID : {trasId}</p>}</div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
