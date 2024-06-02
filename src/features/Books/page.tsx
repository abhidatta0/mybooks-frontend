import { MdOutlineMenuBook } from "react-icons/md";
import { useState } from 'react';
import Modal from "@/components/ui/Modal";
import ListBooks from "./ListBooks/ListBooks";
import {useAuthUser} from '@/features/Auth/useAuthUser';
import AddBookForm from "./AddBook/AddBookForm";

const Books = ()=>{
  const [showModal, setShowModal] = useState(false);
  const {username} = useAuthUser()


  return <div className="p-4">
    <p className="text-4xl">Happy reading,</p>
    <p className="text-4xl"> {username}</p>
    <button className="btn my-3" onClick={()=> setShowModal(true)}>
      <MdOutlineMenuBook size={30}/>
      <p className="text-base">Add new book </p>
    </button>
    <br />
    <ListBooks />
    {showModal && <Modal isVisible={showModal} onClose={()=> setShowModal(false)}>
      <AddBookForm />
      </Modal>}
  </div>
}

export default Books;