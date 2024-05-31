import { useAuthUser } from "@/features/Auth/useAuthUser";
import useGetBooks from "./useGetBooks";
import Book from "./Book";

const ListBooks = ()=>{
   const {id} = useAuthUser();
   const {data: books} = useGetBooks({user_id: id});
   console.log(books);
   if(!books){
      return undefined;
   }
   return books.map((book)=> <Book key={book.id} book={book}/>)
}

export default ListBooks;