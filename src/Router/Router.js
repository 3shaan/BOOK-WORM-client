import { createBrowserRouter } from "react-router-dom";
import BookDetails from "../Components/BookDetals/BookDetails";
import Category from "../Components/Categories/Category";
import MainPage from "../Components/MainPage/MainPage";
import Root from "./Root";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>,
        children: [
            {
                path: '/',
                element:<MainPage></MainPage>
            },
            {
                path: "/category/:id",
                element: <Category></Category>,
                loader: ({ params }) => {
                    return fetch(`http://localhost:5000/category/${params.id}`);
                }
            },
            {
                path: "/books/:id",
                element:<BookDetails></BookDetails>
            }
        ]
    }
])