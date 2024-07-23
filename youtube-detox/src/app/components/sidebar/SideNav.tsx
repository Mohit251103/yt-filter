import StarsIcon from '@mui/icons-material/Stars';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import HomeIcon from '@mui/icons-material/Home';
import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '@/app/context/UserProvider';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { signOut } from 'next-auth/react';
import { SidebarContext } from '@/app/context/SidebarContext';
import { useRouter } from 'next/navigation';

const SideNav = () => {
    const {theme} = useContext(ThemeContext);
    const {drop,setDrop} = useContext(SidebarContext);
    const [pathname,setPathname] = useState(window.location.pathname);
    const router = useRouter();

    useEffect(()=>{
        setPathname(window.location.pathname);
    },[])

    return (
        <div className={`absolute z-10 w-fit h-[85vh] flex flex-col items-start mx-1 border-r p-1`}>
            <div className={`flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer ${pathname==='/dashboard'?'bg-indigo-500/50':''}`} onClick={(e)=>{e.preventDefault(); router.push('/dashboard')}}>
                <HomeIcon sx={{ color: `${theme == "dark" && 'white'}` }} />
                {drop && <p className={`ms-2 text-base font-medium ${theme == "dark" && 'text-white'}`}>Home</p>}
            </div>
            <div className={`flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer ${pathname==='/space/c'?'bg-indigo-500/50':''}`} onClick={(e)=>{e.preventDefault(); router.push('/space/c')}}>
                <AddCircleOutlineIcon sx={{ color: `${theme == "dark" && 'white'}` }} />
                {drop && <p className={`ms-2 text-base font-medium ${theme == "dark" && 'text-white'}`}>Add Space</p>}
            </div>
            <div className={`flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer`}>
                <SubscriptionsIcon sx={{ color: `${theme == "dark" && 'white'}` }} />
                {drop && <p className={`ms-2 text-base font-medium ${theme == "dark" && 'text-white'}`}>Your Spaces</p>}
            </div>
            <div className={`flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer`}>
                <StarsIcon sx={{ color: `${theme == "dark" && 'white'}` }} />
                {drop && <p className={`ms-2 text-base font-medium ${theme == "dark" && 'text-white'}`}>Get Pro</p>}
            </div>
            {drop ? <button className={`text-sm rounded-lg bg-indigo-500/50 p-2 mb-2 font-sans font-medium hover:shadow-lg hover:shadow-indigo-500 absolute bottom-0 self-center ${theme == "dark" && 'text-white'} `} onClick={() => { signOut({ callbackUrl: "/" }) }}><LogoutIcon sx={{ color: `${theme == "dark" && 'white'}` }} /> Sign Out</button>
                :
                <div className="mb-4 rounded-xl hover:bg-indigo-500/50 p-2 absolute bottom-0" onClick={() => { signOut({ callbackUrl: "/sign-in" }) }}>
                    <LogoutIcon sx={{ color: `${theme == "dark" && 'white'}` }} />
                </div>
            }
        </div>
    )
}

export default SideNav