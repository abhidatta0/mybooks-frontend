import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { Book as BookType} from "../types";
import {format,differenceInDays} from 'date-fns';
import YesNoPopup from "@/components/ui/Modal/YesNoPopup";
import useRemoveBook from "./useRemoveBook";
import Modal from "@/components/ui/Modal/Modal";
import EditBookForm from "../EditBook/EditBookForm";
import { pluralize } from "@/libs/utils/strings";

type Props = {
    book:BookType
} 

const Book = ({book}:Props)=>{
    const [ showRemovePrompt, setShowRemovePrompt] = useState(false);
    const [ showEditForm, setShowEditForm] = useState(false);

    const { mutate: removeBook } = useRemoveBook();
    const {title, description,total_number_of_pages, number_of_pages_read,updated_at,created_at} = book;
    const completionPercentage = ((number_of_pages_read/total_number_of_pages)*100).toFixed(1);
    const handleRemove = ()=>{
      removeBook(book.id);
    }

    const updatedDaysDiff = differenceInDays(new Date(), updated_at);
    return <div>
        <div className="flex border mb-2 p-3">
          <div className="w-4/5">
            <p className="text-xl">{title}</p>
            <p className="text-xs italic w-3/5">{description}</p>
            <p className="text-sm">Total pages: {total_number_of_pages}</p>
            <p className="text-sm">Pages read: {number_of_pages_read}</p>
            <p className="text-md text-orange-400">{completionPercentage}% completed</p>
            <div className="flex gap-2">
              <button className="btn btn-outline btn-xs btn-error" onClick={()=> setShowRemovePrompt(true)}>Remove</button>
              <button className="btn btn-outline btn-xs btn-error" onClick={()=> setShowEditForm(true)}>
               <CiEdit className="text-black"/>
                Update 
              </button>
            </div>
          </div>
          <div className="place-self-center">
            <p className="text-sm">Last updated: {updatedDaysDiff > 0 ? `${pluralize("day", updatedDaysDiff)} ago` : 'Today' } </p>   
            <p className="text-sm">Added: {format(created_at,'do MMM yyyy')}</p>
          </div>
        </div>

        <YesNoPopup isVisible={showRemovePrompt} onClose={()=> setShowRemovePrompt(false)} headerText="Are you sure you want to remove this book?" actions={[{children:'Yes', className:'btn-primary', onClick:handleRemove},{children:'No', onClick:()=> setShowRemovePrompt(false)}]}/>
        <Modal isVisible={showEditForm} onClose={()=> setShowEditForm(false)}>
          <EditBookForm book={book} handleClose={()=> setShowEditForm(false)}/> 
        </Modal>
    </div>;
}

export default Book;