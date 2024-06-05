
import { useEffect} from 'react';
import { toastError } from '@/libs/utils/toast';
import { axiosPrivate } from '@/libs/api/axiosFetcher';
import { useAuth } from '@/features/Auth/AuthProvider';

const useAxiosInterceptor = ()=>{
    const {accesssToken, logout} = useAuth();

    useEffect(()=>{
        const responseInterceptor = axiosPrivate.interceptors.response.use(
        response => response,
        async (error)=>{
            const errorMessage = error.response?.data?.message ||  'Something went wrong. Try again!';
            if(error.response.status === 401){
                toastError("Your session has expired. Please log in again to continue.");
                return logout();
            }else{
                toastError(errorMessage);
            }
            return Promise.reject(error);
        }
        );

        // cleanup 
        return ()=>{
           axiosPrivate.interceptors.response.eject(responseInterceptor);
        }
        
      },[accesssToken]);
}

export default useAxiosInterceptor;
