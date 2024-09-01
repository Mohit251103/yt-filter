"use client";
import React, { useContext, useState } from 'react'
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

const Navbar = () => {
    const { data: session } = useSession();
    const { drop, setDrop, open, setOpen } = useContext(SidebarContext);

    const { profilePhoto, username }: { profilePhoto: string, username: string } = useContext(UserContext);
    const { theme, setTheme } = useContext(ThemeContext);
    const handleClick = (e:any) => { 
        e.preventDefault();
        setDrop(!drop);
    }
    return (
        <div className={`flex fixed top-0 z-10 justify-between items-center ${drop && 'backdrop-blur-sm'} ${theme === "dark" ? "bg-black" : "bg-slate-100"} h-[7vh] sticky`}>
            <div className='rounded-full hover:cursor-pointer hover:rotate-180 transition duration-1000' onClick={handleClick}>
                <MenuIcon className='mx-1' sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }} />
            </div>
            <div className='flex justify-between w-full  my-2'>
                <div className={`flex justify-center items-center mx-1 transition duration-500 hover:-rotate-3`}>
                    <img src={theme == "light" ? "/filtered2.png" : "/filtered-dark.png"} alt="" width="100" />
                </div>
            </div>
            <div className='me-4' onClick={() => setTheme(theme == "light" ? "dark" : "light")}>
                <ContrastIcon sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }}/>
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

    )
}

export default Navbar