import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HomeIcon from '@mui/icons-material/Home';
import { useContext, useEffect, useState } from 'react';
// import { UserContext } from '@/app/context/UserProvider';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { SidebarContext } from '@/app/context/SidebarContext';
import { useRouter } from 'next/navigation';

const SideNav = () => {
    const { theme } = useContext(ThemeContext);
    const { drop, setDrop } = useContext(SidebarContext);
    const [pathname, setPathname] = useState(window.location.pathname);
    const router = useRouter();

    useEffect(() => {
        setPathname(window.location.pathname);
    }, [])

    return (
        <div className={`absolute left-2 top-14 rounded-md border-2 z-10 w-fit flex flex-col items-start p-1 bg-${theme === "dark" ? "black" : "white"}`}>
            <div className={`flex mb-4 mt-2 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer ${pathname === '/dashboard' ? 'bg-indigo-500/50' : ''}`} onClick={(e) => { e.preventDefault(); router.push('/dashboard') }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" /><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /></svg>
                {drop && <p className={`ms-2 text-base font-medium ${theme === "dark" ? 'text-white' : 'text-black'}`}>Home</p>}
            </div>
            <div className={`flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer ${pathname === '/space/c' ? 'bg-indigo-500/50' : ''}`} onClick={(e) => { e.preventDefault(); router.push('/space/c') }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-circle-plus"><circle cx="12" cy="12" r="10" /><path d="M8 12h8" /><path d="M12 8v8" /></svg>
                {drop && <p className={`ms-2 text-base font-medium ${theme === "dark" ? 'text-white' : 'text-black'}`}>Add Space</p>}
            </div>

        </div>
    )
}

export default SideNav