import { useState } from "react";
import { Book as BookType} from "../types";
import {format,differenceInDays} from 'date-fns';
import YesNoPopup from "@/components/ui/Modal/YesNoPopup";
import useRemoveBook from "./useRemoveBook";

type Props = {
    book:BookType
} 

const Book = ({book}:Props)=>{
    const [ showRemovePrompt, setShowRemovePrompt] = useState(false);
    const { mutate: removeBook } = useRemoveBook();
    const {title, description,total_number_of_pages, number_of_pages_read,updated_at,created_at} = book;
    const completionPercentage = ((number_of_pages_read/total_number_of_pages)*100).toFixed(1);
    const handleRemove = ()=>{
      removeBook(book.id);
    }
    return <div>
        <div className="flex border mb-2 p-3">
          <div className="w-4/5">
            <p className="text-xl">{title}</p>
            <p className="text-xs italic w-3/5">{description}</p>
            <p className="text-sm">Total pages: {total_number_of_pages}</p>
            <p className="text-sm">Pages read: {number_of_pages_read}</p>
            <p className="text-md text-orange-400">{completionPercentage}% completed</p>
            <div>
              <button className="btn btn-outline btn-xs btn-error" onClick={()=> setShowRemovePrompt(true)}>Remove</button>
            </div>
          </div>
          <div className="place-self-center">
            <p className="text-sm">Last updated: {differenceInDays(updated_at, created_at)} days ago</p>   
            <p className="text-sm">Added: {format(created_at,'do MMM yyyy')}</p>
          </div>
        </div>

        <YesNoPopup isVisible={showRemovePrompt} onClose={()=> setShowRemovePrompt(false)} headerText="Are you sure you want to remove this book?" actions={[{children:'Yes', className:'btn-primary', onClick:handleRemove},{children:'No', onClick:()=> setShowRemovePrompt(false)}]}/>
    </div>;
}

export default Book;