import { PropsWithChildren } from "react";
import useAxiosInterceptor from "../hooks/useAxiosInterceptor";


const AppBootstrap = ({children}:PropsWithChildren)=>{
  useAxiosInterceptor();
  return <>{children}</>;
}

export default AppBootstrap;