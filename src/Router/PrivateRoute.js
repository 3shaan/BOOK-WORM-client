import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../Components/Load & Error/Loading';
import { authContext } from '../Context/Context';

const PrivateRoute = ({ children }) => {
    const location = useLocation();
    const { user, loading } = useContext(authContext);
    if (loading) {
        return <Loading></Loading>
    }
    if (user) {
        return children
    }
     return (
       <Navigate to="/login" state={{ from: location }} replace></Navigate>
     );

};

export default PrivateRoute;