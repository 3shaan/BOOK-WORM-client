import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUsers } from "../Components/Hooks/useUsers";
import Loading from "../Components/Load & Error/Loading";
import { authContext } from "../Context/Context";

const AdminRoute = ({ children }) => {
  const location = useLocation();
    const { user, loading } = useContext(authContext);
    const { userData, isLoading } = useUsers(user?.email);
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (userData.role === "admin") {
    return children;
  }
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default AdminRoute;
