import { createBrowserRouter } from "react-router-dom";
import AllProducts from "../Components/AllProducts/AllProducts";
import EveryProducts from "../Components/AllProducts/EveryProducts";
import Fantasy from "../Components/AllProducts/Fantasy";
import Romance from "../Components/AllProducts/Romance";
import Thriller from "../Components/AllProducts/Thriller";
import Blogs from "../Components/Blogs/Blogs";
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
        path: "/blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "/allproducts",
        element: <AllProducts></AllProducts>,
        children: [
          {
            path: "/allproducts/fantasy",
            element: <Fantasy></Fantasy>,
          },
          {
            path: "/allproducts/thriller",
            element: <Thriller></Thriller>,
          },
          {
            path: "/allproducts/romance",
            element: <Romance/>,
          },
          {
            path: "/allproducts",
            element: <EveryProducts/>,
          },
        ],
      },
      {
        path: "/category/:id",
        element: (
          <PrivateRoute>
            <Category></Category>
          </PrivateRoute>
        ),
        loader: ({ params }) => {
          return fetch(
            `https://book-worm-server.vercel.app/category/${params.id}`,
            {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            }
          );
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
          return fetch(
            `https://book-worm-server.vercel.app/books/${params.id}`,
            {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            }
          );
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
          return fetch(
            `https://book-worm-server.vercel.app/myproduct/${params.id}`,
            {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            }
          );
        },
      },
      {
        path: "/dashboard/wishlist/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) => {
          console.log(params);
          return fetch(
            `https://book-worm-server.vercel.app/wishlist_payment/${params.id}`,
            {
              headers: {
                authorization: localStorage.getItem("token"),
              },
            }
          );
        },
      },
    ],
  },
  {},
]);
