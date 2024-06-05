import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import {  LoginUserObject, LoginRequest, LoginResponse, RegisterRequest } from './Login/types';
import { clearLoginData, getLoginData, saveLoginData } from '@/libs/localstorage/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { cleartoken, gettoken, savetoken } from '@/libs/localstorage/tokens';
import { fetcherPost } from '@/libs/api/axiosFetcher';
import domains from '@/libs/api/domains';

const UserLoginApi = `${domains.APP_BACKEND}/users/login`;
const UserRegisterApi = `${domains.APP_BACKEND}/users`;

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

  useEffect(() => {
    const user = getLoginData();
    const tokendata = gettoken();
    if (user && tokendata) {
      setUser(user);
      setAccesssToken(tokendata.accessToken);
    }
    setIsReady(true);
  }, []);

  const loginUser = async (loginRequest: LoginRequest, fromLocation?: Location) => {
    try{
      const response = await fetcherPost({ url: UserLoginApi, data: loginRequest });
      console.log(response);
      const loginData: LoginResponse = response.data;
      console.log(Cookies.get("access-token"));
      let accessToken = Cookies.get("access-token") ?? '';
      if(!accessToken){
        const hasStorageAccess= await document.hasStorageAccess();
        console.log({hasStorageAccess});
        await document.requestStorageAccess();
        accessToken = Cookies.get("access-token") ?? '';
      }
      console.log({accessToken});
      if (loginData) {
        // saving to local storage
        savetoken({ accessToken:accessToken })
        saveLoginData(loginData.user);
  
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
    clearLoginData();
    cleartoken();
    setUser(null);
    setAccesssToken(null);
    navigate('/login')
  }

  const registerUser = async (registerRequest: RegisterRequest)=>{
    const response = await fetcherPost({ url: UserRegisterApi, data: registerRequest });
    const data = response.data;
    console.log(data);
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