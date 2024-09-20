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
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


const Dashboard = () => {
    const { data: session, status } = useSession();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    const { drop, setDrop, open, setOpen } = useContext(SidebarContext);
    useEffect(() => {
        if(status == "loading") return;
        setLoading(false);
    }, [session])

    useEffect(()=>{
        if(status == "unauthenticated"){
            router.push("/api/auth/signin");
        }
    },[status]);


    const { theme, setTheme } = useContext(ThemeContext);
    return (
        !loading ?
            <>
                <div className={`${theme == "light" ? 'bg-white' : 'bg-[rgb(13,13,13)]'}`} >
                    <Navbar />
                    {/* <div className='text-center my-2vh'>
                        <p className='max-sm:text-xl text-2xl text-gray-400 font-bold'>Welcome, <span className='text-indigo-400'>{session?.user.username}</span></p>
                    </div> */}
                    <div className='overflow-hidden' onClick={() => { setDrop(false); setOpen(false) }}>
                        <SpaceList />
                    </div>
                    {/* <div className='absolute bottom-1 md:left-[45vw] max-sm:left-[28vw] max-sm:text-lg'> */}
                    {/* </div> */}
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