import { PropsWithChildren, useState, createContext, useContext } from 'react';
import Logo from '@/assets/book-bookmark.svg';
import { TiChevronLeftOutline } from "react-icons/ti";
import { TiChevronRight } from "react-icons/ti";
import Constants from '@/constants/app';

type Props = PropsWithChildren;
const SidebarContext = createContext(false);

const Sidebar = ({children}:Props)=>{
  const [expanded, setExpanded] = useState(true);
  return (
    <aside className="h-screen">
      <nav className="h-full flex flex-col bg-white border-r shadown-sm">
        <div className="p-4 pb-3 flex justify-between items-center">
          <div className={`flex items-center ${!expanded && 'w-0'}`}>
          <img src={Logo} className={`mr-2 rounded overflow-hidden transition-all ${expanded ? "w-12":"w-0"}`} alt=""/>
          <p className={`rounded overflow-hidden transition-all ${expanded ? "":"w-0"}`}>{Constants.APP_NAME}</p>
          </div>
          <button onClick={()=> setExpanded(prev => !prev)} className='p-1.5 rounded-lg bg-gray-50 hover:bg-orange-100'>
            {expanded ? <TiChevronLeftOutline /> : <TiChevronRight />}
          </button>
        </div>

        <SidebarContext.Provider value={expanded}>
          <ul className='flex-1 px-3'>{children}</ul>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

export default Sidebar;

export const useSidebarContext = ()=> useContext(SidebarContext);