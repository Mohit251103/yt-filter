import StarsIcon from '@mui/icons-material/Stars';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HomeIcon from '@mui/icons-material/Home';
import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '@/app/context/UserProvider';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { SidebarContext } from '@/app/context/SidebarContext';
import { useRouter } from 'next/navigation';
import { blueGrey } from '@mui/material/colors';

const SideNav = () => {
    const {theme} = useContext(ThemeContext);
    const {drop,setDrop} = useContext(SidebarContext);
    const [pathname,setPathname] = useState(window.location.pathname);
    const router = useRouter();

    useEffect(()=>{
        setPathname(window.location.pathname);
    },[])

    return (
        <div className={`absolute left-2 top-14 rounded-md border-2 z-10 w-fit flex flex-col items-start p-1 bg-${theme==="dark"?"black":"white"}`}>
            <div className={`flex mb-4 mt-2 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer ${pathname==='/dashboard'?'bg-indigo-500/50':''}`} onClick={(e)=>{e.preventDefault(); router.push('/dashboard')}}>
                <HomeIcon sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }} />
                {drop && <p className={`ms-2 text-base font-medium ${theme === "dark" ? 'text-white' : 'text-black'}`}>Home</p>}
            </div>
            <div className={`flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer ${pathname==='/space/c'?'bg-indigo-500/50':''}`} onClick={(e)=>{e.preventDefault(); router.push('/space/c')}}>
                <AddCircleOutlineIcon sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }} />
                {drop && <p className={`ms-2 text-base font-medium ${theme === "dark" ? 'text-white' : 'text-black'}`}>Add Space</p>}
            </div>
            <div className={`flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer`}>
                <SubscriptionsIcon sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }} />
                {drop && <p className={`ms-2 text-base font-medium ${theme === "dark" ? 'text-white' : 'text-black'}`}>Your Spaces</p>}
            </div>
            <div className={`flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer`}>
                <StarsIcon sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }} />
                {drop && <p className={`ms-2 text-base font-medium ${theme === "dark" ? 'text-white' : 'text-black'}`}>Get Pro</p>}
            </div>
            
        </div>
    )
}

export default SideNav