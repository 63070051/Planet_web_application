import { Navigate } from "react-router-dom";

export const RequireNotAuth = ({children}) =>{
    if(!!localStorage.getItem('id')){
        return <Navigate to="/Dashboard" />
    }
    return children;
}