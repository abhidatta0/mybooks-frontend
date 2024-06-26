import { useQuery } from "@tanstack/react-query"
import QueryKeys from "@/libs/api/queryKeys"
import { getBooksOverview } from "../api";
import { GetAllBooksByUserIdRequest } from "../types";

const useGetBooks = (payload: GetAllBooksByUserIdRequest)=>{
    return useQuery({
        queryKey:[QueryKeys.MyBooks,payload.user_id],
        queryFn: ()=> getBooksOverview(payload)
    })
}

export default useGetBooks;