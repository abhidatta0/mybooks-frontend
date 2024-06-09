import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import {  LoginUserObject, LoginRequest, LoginResponse, RegisterRequest } from './Login/types';
import { useNavigate } from 'react-router-dom';
import { cleartoken, gettoken, savetoken } from '@/libs/localstorage/tokens';
import { fetcherPost } from '@/libs/api/axiosFetcher';
import domains from '@/libs/api/domains';
import { AxiosError } from 'axios';
import { toastError } from '@/libs/utils/toast';

const UserLoginApi = `${domains.APP_BACKEND}/users/login`;
const UserRegisterApi = `${domains.APP_BACKEND}/users`;
const UserProfileApi = `${domains.APP_BACKEND}/users/profile`;

type AuthContextType = {
  user: LoginUserObject | null;
  accesssToken: string | null,
  loginUser: (loginRequest: LoginRequest,fromLocation?:Location) => void;
  registerUser: (registerRequest: RegisterRequest) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  setAccesssToken: (accesssToken: string)=> void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({ children }: PropsWithChildren) => {
  const navigate = useNavigate();
  const [accesssToken, setAccesssToken] = useState<string | null>(null);

  const [user, setUser] = useState<LoginUserObject | null>(null);
  const [isReady, setIsReady] = useState(false);

  const getUserData = async ()=>{
    try{
      const response = await fetcherPost({ url: UserProfileApi});
      const userData = response.data;
      setUser(userData);
    }catch(error){
      let errorMessage =  'Something went wrong. Try again!';
      if(error instanceof AxiosError){
        errorMessage = error.response?.data?.message;
      }
      toastError(errorMessage);
      logout();
    }
    finally{
      setIsReady(true);
    }
  }
  
  useEffect(() => {
    const tokendata = gettoken();
    if (tokendata) {
      setAccesssToken(tokendata.accessToken);
      if(!user){
        getUserData();
      }
    }
    else{
      setIsReady(true);
    }
  }, []);

  const loginUser = async (loginRequest: LoginRequest, fromLocation?: Location) => {
    try{
      const response = await fetcherPost({ url: UserLoginApi, data: loginRequest });
      const loginData: LoginResponse = response.data;
      const accessToken = loginData.tokens.accessToken;
      if (loginData) {
        // saving to local storage
        savetoken({ accessToken:accessToken })
  
        // saving in context state
        setUser(loginData.user);
        setAccesssToken(accessToken);
        navigate(fromLocation || '/',{replace:true})
      }
    }catch(err){
      console.error(err)
    }
    
  }

  const isLoggedIn = () => {
    return !!user;
  }

  const logout = () => {
    cleartoken();
    setUser(null);
    setAccesssToken(null);
    navigate('/login')
  }

  const registerUser = async (registerRequest: RegisterRequest)=>{
    const response = await fetcherPost({ url: UserRegisterApi, data: registerRequest });
    const data = response.data;
    if(data.success){
      navigate('/login');
    }    
  }

  return <AuthContext.Provider value={{ loginUser, registerUser, user, accesssToken, isLoggedIn, logout, setAccesssToken }}>
    {isReady ? children : null}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}