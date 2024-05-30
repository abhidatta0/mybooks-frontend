import { MdOutlineMenuBook } from "react-icons/md";
import { useState } from 'react';
import Modal from "@/components/ui/Modal";
import ListBooks from "./ListBooks/ListBooks";

const Books = ()=>{
  const [showModal, setShowModal] = useState(false);


  return <div>
    <button className="btn" onClick={()=> setShowModal(true)}>
      <MdOutlineMenuBook size={30}/>
      <p className="text-base">Add new book </p>
    </button>
    <br />
    <ListBooks />
    {showModal && <Modal isVisible={showModal} onClose={()=> setShowModal(false)}>
          Dummy Content
      </Modal>}
  </div>
}

export default Books;