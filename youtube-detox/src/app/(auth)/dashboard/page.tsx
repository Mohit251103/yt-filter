"use client";
import React, { useEffect, useState, useContext } from 'react'
import { useSession, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation';
import Cookies from "js-cookie";
import { ThreeDots } from 'react-loader-spinner';
import Navbar from '@/app/components/Navbar';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { UserContext } from '@/app/context/UserProvider';
import Profile from '@/app/components/sidebar/Profile';
import { ThemeContext } from '@/app/context/ThemeProvider';
import SideNav from '@/app/components/sidebar/SideNav';
import { SidebarContext } from '@/app/context/SidebarContext';
import SpaceList from '@/app/components/space/SpaceList';
import { Footer } from '@/app/components/footer/Footer';


const Dashboard = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    const { drop, setDrop, open, setOpen } = useContext(SidebarContext);
    useEffect(() => {
        setLoading(false);
    }, [session])


    const { theme, setTheme } = useContext(ThemeContext);
    return (
        !loading ?
            <>
                <div className={`${theme == "light" ? 'bg-white' : 'bg-[rgb(13,13,13)]'} h-[100vh] w-[100vw]`} >
                    <Navbar />
                    <div className='overflow-auto' onClick={() => {setDrop(false); setOpen(false)}}>
                        <SpaceList />
                    </div>
                </div>
            </>
            :
            <div className={`flex flex-col justify-center items-center h-[100vh] w-[100vw] ${theme == "light" ? 'bg-white' : 'bg-[rgb(13,13,13)]'}`}>
                <ThreeDots
                    visible={true}
                    height="80"
                    width="80"
                    color="black"
                    radius="9"
                    ariaLabel="three-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                />
            </div>

    )
}

export default Dashboard