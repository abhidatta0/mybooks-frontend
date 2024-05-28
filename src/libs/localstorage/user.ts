import { LoginUserObject } from "@/features/Auth/Login/types";
import Constants from '@/constants/app';

const ACHIEV_USER_DATA_KEY= `${Constants.APP_NAME}_USER_DATA`;

export const saveLoginData = (data:LoginUserObject)=>{
    localStorage.setItem(ACHIEV_USER_DATA_KEY, JSON.stringify(data))
}

export const getLoginData = ()=>{
    const data = localStorage.getItem(ACHIEV_USER_DATA_KEY);
    if(data){
      return JSON.parse(data);
    }
    return null;
}

export const clearLoginData = ()=>{
    localStorage.removeItem(ACHIEV_USER_DATA_KEY);
}