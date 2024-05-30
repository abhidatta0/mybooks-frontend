import { fetcherPost } from "@/libs/api/axiosFetcher";
import { GetAllBooksByUserIdRequest, GetAllBooksByUserIdResponse } from "./types";
import domains from "@/libs/api/domains";

const GetAllBooksApi = `${domains.APP_BACKEND}/books/my`;


export const getTasksOverview = async (payload: GetAllBooksByUserIdRequest):Promise<GetAllBooksByUserIdResponse>=>{
    const response = await fetcherPost({
        url: GetAllBooksApi,
        data: payload,
    });

    return response.data;
}