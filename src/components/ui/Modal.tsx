
export type Props = {
    isVisible: boolean;
    onClose: ()=> void;
    children: React.ReactNode;
}
const Modal = ({isVisible, onClose, children}:Props)=>{

  if(!isVisible) return null;

  const handleBackdropClose = (e: React.MouseEvent<HTMLDivElement > )=>{
   if((e.target as Element).id=== "modal-wrapper"){
    onClose();
   }
  }

  return (
    <div id="modal-wrapper" className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center" onClick={handleBackdropClose}>
      <div className="w-[90%] mx-auto md:w-[600px] flex flex-col">
         <button className="btn btn-sm btn-circle text-xs place-self-end mb-1 " onClick={onClose}>X</button>
         <div className="bg-white p-6 rounded">
           {children}
         </div>
      </div>
    </div>
  )
}

export default Modal;