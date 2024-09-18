"use client";
import React, { useContext, useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
// import { signOut } from 'next-auth/react';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StarsIcon from '@mui/icons-material/Stars';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { UserContext } from '@/app/context/UserProvider';
import Profile from '@/app/components/sidebar/Profile';
import VerifiedIcon from '@mui/icons-material/Verified';
import ContrastIcon from '@mui/icons-material/Contrast';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { useSession } from 'next-auth/react';
import { SidebarContext } from '../context/SidebarContext';
import SideNav from './sidebar/SideNav';
import { blueGrey } from '@mui/material/colors';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const { data: session } = useSession();
    const { drop, setDrop, open, setOpen } = useContext(SidebarContext);

    const { profilePhoto, username }: { profilePhoto: string, username: string } = useContext(UserContext);
    const { theme, setTheme } = useContext(ThemeContext);

    const [pathname, setPathname] = useState(window.location.pathname);
    const router = useRouter();
    const handleClick = (e: any) => {
        e.preventDefault();
        setDrop(!drop);
    }

    useEffect(()=>{
        setPathname(window.location.pathname);
    },[])
    
    return (
        <div className={`flex fixed top-0 z-10 justify-between items-center ${drop && 'backdrop-blur-sm'} ${theme === "dark" ? "bg-black" : "bg-slate-100"} h-[7vh] sticky px-3`}>
            <div className='flex items-center'>
                <div className='rounded-full hover:cursor-pointer hover:rotate-180 transition duration-1000 sm:hidden' onClick={handleClick}>
                    <MenuIcon className='mx-1' sx={{ color: `${theme == "dark" ? blueGrey[50] : blueGrey[900]}` }} />
                </div>
                <div className='flex items-center justify-center my-2'>
                    <div>
                        <p className={`text-2xl font-extrabold ${theme == "dark" ? "text-white" : "text-black"} hover:cursor-pointer`} onClick={(e) => { e.preventDefault(); router.push('/dashboard') }}>filtered<span className='text-red-600'>.</span></p>
                    </div>
                    <div className='flex items-center max-sm:hidden ml-3'>
                        <div className={`flex rounded-xl hover:opacity-80 p-2 hover:cursor-pointer ${pathname === '/dashboard' ? 'opacity-80' : ''}`} onClick={(e) => { e.preventDefault(); router.push('/dashboard') }}>
                            <p className={`ms-2 text-md font-medium ${theme === "dark" ? 'text-white' : 'text-black'}`}>Home</p>
                        </div>
                        <div className={`flex rounded-xl hover:opacity-80 p-2 hover:cursor-pointer ${pathname === '/space/c' ? 'opacity-80' : ''}`} onClick={(e) => { e.preventDefault(); router.push('/space/c') }}>
                            <p className={`ms-2 text-md font-medium ${theme === "dark" ? 'text-white' : 'text-black'}`}>Add Space</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <div className='me-4' onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
                    <ContrastIcon sx={{ color: `${theme == "dark" ? blueGrey[50] : blueGrey[900]}` }} />
                </div>
                <VerifiedIcon color='primary' />
                <div className='flex justify-center items-center me-2' onClick={() => setOpen(!open)}>
                    <img src={profilePhoto} width={40} className='rounded-full ms-1 hover:shadow hover:shadow-slate-500/50 hover:cursor-pointer' />
                </div>

                {drop && <SideNav />}
                <div className='absolute right-0 w-[15vw] top-12'>
                    {open &&
                        <Profile />
                    }
                </div>
            </div>
        </div>

    )
}

export default Navbar