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
   if(books.length === 0){
      return <div className="text-center">
         <p className="text-xl">Your Library is Empty!</p>
         <p>It looks like you haven't added any books yet.</p>
      </div>
   }
   return books.map((book)=> <Book key={book.id} book={book}/>)
}

export default ListBooks;