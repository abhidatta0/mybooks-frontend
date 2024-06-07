import { PropsWithChildren, useState, createContext, useContext } from 'react';
import Logo from '@/assets/book-bookmark.svg';
import { TiChevronLeftOutline } from "react-icons/ti";
import { IoChevronUp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoIosLogOut } from "react-icons/io";
import { TiChevronRight } from "react-icons/ti";
import Constants from '@/constants/app';
import { useAuth } from '@/features/Auth/AuthProvider';
import { useAuthUser } from '@/features/Auth/useAuthUser';
import TooltipModal from '@/components/ui/Modal/TooltipModal';

type Props = PropsWithChildren;
const SidebarContext = createContext(false);

const Sidebar = ({children}:Props)=>{
  const [expanded, setExpanded] = useState(true);
  const [showProfileTooltip, setShowProfileTooltip] = useState(false);

  const {username, email} = useAuthUser();

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
          <div className='flex flex-1 flex-col px-3 mb-3 justify-between'>
             <ul className=''>{children}</ul>
             <TooltipModal isVisible={showProfileTooltip} tooltipContent={<ProfileTooltipActions />} 
             parent={(
              <div className={`border-gray-300 border p-3 rounded hover:bg-gray-200`} onClick={()=>setShowProfileTooltip(true)}>
                {expanded ? (<div className='flex items-center space-x-2'>
                  <div>
                    <p className='text-lg'>{username}</p>
                    <p className='text-xs font-light'>{email}</p>
                </div>
                <IoChevronUp />
                </div>) : <CgProfile />}
                </div>
             )}
             onBlur={()=> setShowProfileTooltip(false)}
             />
        </div>
        </SidebarContext.Provider>
      </nav>
    </aside>
  )
}

export default Sidebar;

export const useSidebarContext = ()=> useContext(SidebarContext);

const ProfileTooltipActions = ()=>{
  const {logout} = useAuth();

  return <div>
    <button className='flex items-center rounded p-1 space-x-2 hover:bg-blue-400 w-full ' onClick={logout}>
    <IoIosLogOut className='text-red-700' size={20}/>
    <p className='text-gray-500 text-sm flex-1 text-left hover:text-white'>Sign out</p>
    </button>
  </div>
}