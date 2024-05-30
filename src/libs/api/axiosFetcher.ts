import  axios,{ Method , AxiosRequestHeaders} from "axios";
import Cookies from 'js-cookie';
import { gettoken } from "../localstorage/tokens";

type FetcherPayload = {
    url:string, 
    data?: Record<string,unknown>,
    headers?: AxiosRequestHeaders
}

type FetcherPayloadWithMethod = FetcherPayload & {
    method: Method,
}

export const axiosPrivate = axios.create({
    withCredentials: true,
    headers:{'Content-Type':'application/json',},
})

const axiosFetcher = async (payload: FetcherPayloadWithMethod)=> {
    const tokendata = gettoken();
    let accessToken;
    if(tokendata){
        accessToken = tokendata.accessToken;
    }
    Cookies.set("access-token",accessToken ?? '',{secure:true});
    return axiosPrivate({...payload, headers:{
     'Authorization': payload.headers?.Authorization ?? `Bearer ${accessToken}`,
     ...payload.headers,
    }})
}
const fetcherGet = (payload: FetcherPayload)=> axiosFetcher({method: 'GET', ...payload});
const fetcherPost = (payload: FetcherPayload)=> axiosFetcher({method: 'POST', ...payload});
const fetcherPut = (payload: FetcherPayload)=> axiosFetcher({method: 'PUT', ...payload});
const fetcherDelete = (payload: FetcherPayload)=> axiosFetcher({method: 'DELETE', ...payload});

export {fetcherGet, fetcherPost, fetcherPut,fetcherDelete, axiosFetcher};