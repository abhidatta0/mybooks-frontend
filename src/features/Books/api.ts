import { fetcherPost, fetcherDelete, fetcherPatch } from "@/libs/api/axiosFetcher";
import { GetAllBooksByUserIdRequest, GetAllBooksByUserIdResponse, CreateBookRequest, EditBookRequest } from "./types";
import domains from "@/libs/api/domains";

const GetAllBooksApi = `${domains.APP_BACKEND}/books/my`;
const AddBookApi = `${domains.APP_BACKEND}/books`;
const RemoveOrUpdateBookApi = `${domains.APP_BACKEND}/books/:id`;


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

export const editBook = async (id: number,payload:EditBookRequest)=>{
    const response = await fetcherPatch({
        url: RemoveOrUpdateBookApi.replace(":id", id.toString()),
        data: payload,
    });

    return response.data;
}

export const removeBook = async (id:number)=>{
    const response = await fetcherDelete({
        url: RemoveOrUpdateBookApi.replace(":id", id.toString()),
    });

    return response.data;
}