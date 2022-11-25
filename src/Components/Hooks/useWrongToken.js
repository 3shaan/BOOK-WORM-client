import { useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { authContext } from "../../Context/Context";



export const useWrongToken = error => {
    const { logOut } = useContext(authContext);
    const navigate = useNavigate();
    const data = error?.response?.status; 
    if (data === 403 || data === 401) {
        logOut();
        navigate('/login')
        toast.error('please login again')
    }
}