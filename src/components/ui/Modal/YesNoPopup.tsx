import Modal,{Props as ModalProps} from "./Modal";

type Props = Omit<ModalProps,'children'> & {
    headerText: string;
    actions:Actions[];
}

type Actions = {text: string };
const YesNoPopup = (props:Props)=>{
   return (
    <Modal {...props}>
       <h1 className="text-lg text-center">{props.headerText}</h1>
       <div className="flex place-content-end items-center gap-3">
          {
            props.actions.map(action=>  <button className="btn btn-sm" key={action.text}  {...action}>{action.text}</button>)
          }
       </div>
    </Modal>
   )
}

export default YesNoPopup;