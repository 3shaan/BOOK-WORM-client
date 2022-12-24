import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./Router/Router";
import { themeChange } from "theme-change";

function App() {
  // useEffect(() => {
  //    themeChange(false);
  // },[])
  
  useEffect(() => {
    document.documentElement.classList.add("light");
  },[])
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
