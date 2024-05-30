import { useAuthUser } from "@/features/Auth/useAuthUser";
import useGetBooks from "./useGetBooks";

const ListBooks = ()=>{
   const {id} = useAuthUser();
   const {data} = useGetBooks({user_id: id});
   console.log(data);
   return "ListBooks"
}

export default ListBooks;