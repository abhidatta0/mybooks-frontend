import { useMutation, useQueryClient } from "@tanstack/react-query"
import { EditBookRequest } from "../types"
import {editBook} from '../api';
import QueryKeys from "@/libs/api/queryKeys";

const useEditBook = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({id, payload}:{payload: EditBookRequest, id: number})=> editBook(id,payload),
        onSuccess: async ()=>{
            await queryClient.invalidateQueries({queryKey:[QueryKeys.MyBooks]});
        }
    })
}

export default useEditBook;