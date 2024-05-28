import { PropsWithChildren } from "react";
import { useAuth } from "./AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

type Props = PropsWithChildren;

const ProtectedRoute = ({children}:Props)=>{
  const {isLoggedIn} = useAuth();
  const location = useLocation();

  return isLoggedIn() ? <>{children}</> : <Navigate to="/login" state={{from: location}} replace />
 } 

export default ProtectedRoute;