import { useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateBookRequest } from "../types"
import {addBook} from '../api';
import QueryKeys from "@/libs/api/queryKeys";

const useAddBook = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload: CreateBookRequest)=> addBook(payload),
        onSuccess: async ()=>{
            await queryClient.invalidateQueries({queryKey:[QueryKeys.MyBooks]});
        }
    })
}

export default useAddBook;