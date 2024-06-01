import { useNavigate } from 'react-router-dom';
import {useSidebarContext} from './page';

type Props = {
    icon: React.ReactNode,
    text: string;
    routePath: string;
    active?: boolean,
};
  
const SidebarItem = ({icon, text, routePath,active}:Props)=>{
    const expanded = useSidebarContext();
    const navigate = useNavigate();

    return (
    <li className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer 
    transition-colors group ${active ? "bg-gradient-to-tr from-orange-200 to-orange-100 text-orange-800" : "hover:bg-orange-50 text-gray-600"}`}
    onClick={()=> navigate(routePath)}>
    {icon}
    <span className={`overflow-hidden transition-all ${expanded ? "w-36 ml-3":"w-0"}`}>{text}</span>

    {!expanded && <div className={`absolute left-full rounded-md px-2 py-1 ml-6
    bg-orange-300 text-orange-800 text-sm
    invisible opacity-20 -translate-x-3 transition-all
    group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
    `}>{text}</div>}
    </li>
    )
}

export default SidebarItem;