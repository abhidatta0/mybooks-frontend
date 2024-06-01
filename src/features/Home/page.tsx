import { Outlet, useMatch } from "react-router-dom";
import Sidebar from "@/features/Sidebar/page";
import SidebarItem from "@/features/Sidebar/SidebarItem";
import { RiHome2Line } from "react-icons/ri";

const Home  = ()=>{
    const homeMatch = useMatch('/');
   return (
    <main className='flex'>
      <Sidebar>
         <SidebarItem icon={<RiHome2Line />} text="Home" active={!!homeMatch} routePath='/'/>
      </Sidebar>
      <div className='grow'>
      <div className="bg-[#FAF9F6] h-full">
      <Outlet />
      </div>
      </div>
    </main>
   )
   
}

export default Home;