import { useMutation, useQueryClient } from "@tanstack/react-query"
import {removeBook} from '../api';
import QueryKeys from "@/libs/api/queryKeys";

const useRemoveBook = ()=>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number)=> removeBook(id),
        onSuccess: async ()=>{
            await queryClient.invalidateQueries({queryKey:[QueryKeys.MyBooks]});
        }
    })
}

export default useRemoveBook;