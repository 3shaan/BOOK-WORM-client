import { createBrowserRouter } from "react-router-dom";
import BookDetails from "../Components/BookDetals/BookDetails";
import Category from "../Components/Categories/Category";
import MyOrders from "../Components/DashBoard/Buyer/MyOrders";
import DashBoard from "../Components/DashBoard/DashBoard";
import Login from "../Components/Login & Signup/Login";
import SignUp from "../Components/Login & Signup/SignUp";
import MainPage from "../Components/MainPage/MainPage";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
        element: <MainPage></MainPage>,
      },
      {
        path: "/category/:id",
        element: <Category></Category>,
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/category/${params.id}`);
        },
      },
      {
        path: "/books/:id",
        element: <BookDetails></BookDetails>,
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/books/${params.id}`);
        },
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
    ],
  },
  {
    path: "/dashboard",
      element: <DashBoard></DashBoard>,
      children: [
        {
          path: '/dashboard/myorder',
          element:<MyOrders></MyOrders>
        }
    ]
  }
]);
