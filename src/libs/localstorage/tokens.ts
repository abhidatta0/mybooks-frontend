import Constants from '@/constants/app';

const AUTH_TOKEN_KEY= `${Constants.APP_NAME}_AUTH_TOKEN`;

export const savetoken = (data: {accessToken: string})=>{
    localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(data))
}

export const gettoken = ():null|Record<string, string>=>{
    const tokendata = localStorage.getItem(AUTH_TOKEN_KEY);
    if(tokendata){
      return JSON.parse(tokendata);
    }
    return null;
}

export const cleartoken = ()=>{
    localStorage.removeItem(AUTH_TOKEN_KEY);
}