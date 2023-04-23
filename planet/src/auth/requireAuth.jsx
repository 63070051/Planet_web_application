import { Navigate } from "react-router-dom";

export const RequireAuth = ({children}) =>{
    if(!localStorage.getItem('id')){
        return <Navigate to="/login" />
    }
    return children;
}