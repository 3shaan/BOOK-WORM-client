import { createBrowserRouter } from "react-router-dom";
import BookDetails from "../Components/BookDetals/BookDetails";
import Category from "../Components/Categories/Category";
import AllBuyers from "../Components/DashBoard/Admin/AllBuyers";
import AllSellers from "../Components/DashBoard/Admin/AllSellers";
import ReportedItems from "../Components/DashBoard/Admin/ReportedItems";
import MyOrders from "../Components/DashBoard/Buyer/MyOrders";
import Payment from "../Components/DashBoard/Buyer/Payment";
import WishList from "../Components/DashBoard/Buyer/WishList";
import DashBoard from "../Components/DashBoard/DashBoard";
import DashBoardMainContent from "../Components/DashBoard/DashBoardMainContent";
import AddProducts from "../Components/DashBoard/Sellers/AddProducts";
import MyBuyers from "../Components/DashBoard/Sellers/MyBuyers";
import MyProducts from "../Components/DashBoard/Sellers/MyProducts";
import Error from "../Components/Load & Error/Error";
import Login from "../Components/Login & Signup/Login";
import SignUp from "../Components/Login & Signup/SignUp";
import MainPage from "../Components/MainPage/MainPage";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
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
    element: (
      <PrivateRoute>
        <DashBoard></DashBoard>
      </PrivateRoute>
    ),
    errorElement: <Error></Error>,
    children: [
      {
        path: "/dashboard",
        element: <DashBoardMainContent></DashBoardMainContent>,
      },
      {
        path: "/dashboard/myorder",
        element: <MyOrders></MyOrders>,
      },
      {
        path: "/dashboard/addproduct",
        element: <AddProducts></AddProducts>,
      },
      {
        path: "/dashboard/mybuyer",
        element: <MyBuyers></MyBuyers>,
      },
      {
        path: "/dashboard/myproduct",
        element: <MyProducts></MyProducts>,
      },
      {
        path: "/dashboard/allbuyers",
        element: <AllBuyers></AllBuyers>,
      },
      {
        path: "/dashboard/allsellers",
        element: <AllSellers></AllSellers>,
      },
      {
        path: "/dashboard/wishlist",
        element: <WishList></WishList>,
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/myproduct/${params.id}`)
        }
      },
    ],
  },
]);
