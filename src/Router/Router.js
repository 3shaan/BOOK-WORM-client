import { createBrowserRouter } from "react-router-dom";
import BookDetails from "../Components/BookDetals/BookDetails";
import Category from "../Components/Categories/Category";
import AllBuyers from "../Components/DashBoard/Admin/AllBuyers";
import AllSellers from "../Components/DashBoard/Admin/AllSellers";
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
import AdminRoute from "./AdminRoute";
import BuyerRoute from "./BuyerRoute";
import PrivateRoute from "./PrivateRoute";
import Root from "./Root";
import SellerRoute from "./SellerRoute";

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
        element: (
          <PrivateRoute>
            <Category></Category>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/category/${params.id}`);
        },
      },
      {
        path: "/books/:id",
        element: (
          <PrivateRoute>
            <BookDetails></BookDetails>
          </PrivateRoute>
        ),
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
        element: (
          <BuyerRoute>
            <MyOrders></MyOrders>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProducts></AddProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/mybuyer",
        element: (
          <SellerRoute>
            <MyBuyers></MyBuyers>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myproduct",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allbuyers",
        element: (
          <AdminRoute>
            <AllBuyers></AllBuyers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/allsellers",
        element: (
          <AdminRoute>
            <AllSellers></AllSellers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/wishlist",
        element: (
          <BuyerRoute>
            <WishList></WishList>
          </BuyerRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) => {
          return fetch(`http://localhost:5000/myproduct/${params.id}`);
        },
      },
    ],
  },
]);
