type Props = {
    isVisible: boolean;
    parent: React.ReactNode;
    tooltipContent: React.ReactNode;
    onBlur:()=> void;
}
const TooltipModal = ({isVisible,parent, tooltipContent, onBlur}:Props)=>{
   return (
    <div className="relative flex" onBlur={onBlur} tabIndex={0}>
      {parent}
      <div className={`absolute -top-10 left-0 right-0 transition-all border bg-white shadow-md rounded p-1 ${isVisible ? "scale-100":"scale-0"}`}>
        {tooltipContent}
      </div>
    </div>
   )
}

export default TooltipModal;