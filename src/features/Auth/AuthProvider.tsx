import { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import {  LoginUserObject, LoginRequest, LoginResponse } from './Login/types';
import { clearLoginData, getLoginData, saveLoginData } from '@/libs/localstorage/user';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { cleartoken, gettoken, savetoken } from '@/libs/localstorage/tokens';
import { fetcherPost } from '@/libs/api/axiosFetcher';
import domains from '@/libs/api/domains';

console.log(domains);
const UserLoginApi = `${domains.APP_BACKEND}/users/login`;

type AuthContextType = {
  user: LoginUserObject | null;
  accesssToken: string | null,
  loginUser: (loginRequest: LoginRequest,fromLocation?:Location) => void;
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
    const response = await fetcherPost({ url: UserLoginApi, data: loginRequest });
    const loginData: LoginResponse = response.data;
    const accessToken = Cookies.get("access-token") ?? '';
    if (loginData) {
      // saving to local storage
      savetoken({ accessToken:accessToken })
      saveLoginData(loginData.user);

      // saving in context state
      setUser(loginData.user);
      setAccesssToken(accessToken);
      navigate(fromLocation || '/',{replace:true})
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

  return <AuthContext.Provider value={{ loginUser, user, accesssToken, isLoggedIn, logout, setAccesssToken }}>
    {isReady ? children : null}
  </AuthContext.Provider>
}

export default AuthProvider;

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
}