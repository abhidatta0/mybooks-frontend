import Modal,{Props as ModalProps} from "./Modal";

type Props = Omit<ModalProps,'children'> & {
    headerText: string;
    actions:Actions[];
}

type Actions = React.ComponentPropsWithoutRef<"button">;
const YesNoPopup = (props:Props)=>{
   return (
    <Modal {...props}>
       <h1 className="text-lg text-center">{props.headerText}</h1>
       <div className="flex place-content-end items-center gap-3">
          {
            props.actions.map(({className,...rest})=>  <button className={`btn btn-sm ${className}`} key={rest.accessKey}  {...rest} />)
          }
       </div>
    </Modal>
   )
}

export default YesNoPopup;