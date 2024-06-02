import { fetcherPost } from "@/libs/api/axiosFetcher";
import { GetAllBooksByUserIdRequest, GetAllBooksByUserIdResponse, CreateBookRequest } from "./types";
import domains from "@/libs/api/domains";

const GetAllBooksApi = `${domains.APP_BACKEND}/books/my`;
const AddBookApi = `${domains.APP_BACKEND}/books`;


export const getBooksOverview = async (payload: GetAllBooksByUserIdRequest):Promise<GetAllBooksByUserIdResponse>=>{
    const response = await fetcherPost({
        url: GetAllBooksApi,
        data: payload,
    });

    return response.data;
}

export const addBook = async (payload:CreateBookRequest)=>{
    const response = await fetcherPost({
        url: AddBookApi,
        data: payload,
    });

    return response.data;
}