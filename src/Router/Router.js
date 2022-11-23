import { createBrowserRouter } from "react-router-dom";
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
            }
        ]
    }
])