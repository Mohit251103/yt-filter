"use client";
import React, { useEffect, useState, useContext } from 'react'
import { useSession, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Cookies from "js-cookie";
import { ThreeDots } from 'react-loader-spinner';
import Navbar from '@/app/components/Navbar';
import MenuIcon from '@mui/icons-material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import StarsIcon from '@mui/icons-material/Stars';
import LogoutIcon from '@mui/icons-material/Logout';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import { UserContext } from '@/app/context/UserProvider';
import Profile from '@/app/components/sidebar/Profile';
import VerifiedIcon from '@mui/icons-material/Verified';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { ThemeContext } from '@/app/context/ThemeProvider';

const Dashboard = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [drop, setDrop] = useState(false);
    const [open, setOpen] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [session])

    const { profilePhoto, username }: { profilePhoto: string, username: string } = useContext(UserContext);
    const {theme,setTheme} = useContext(ThemeContext);
    return (
        !loading ?
            <>
                <div className={`${theme=="light"?'bg-white':'bg-[rgb(13,13,13)]'} h-[100vh] w-[100vw]`}>
                    <div className='flex items-center '>
                        <div className='rounded-full hover:cursor-pointer hover:rotate-180 transition duration-1000' onClick={(e) => { e.preventDefault(); setDrop(!drop) }}>
                            <MenuIcon className='mx-1' sx={{color:`${theme=="dark" && 'white'}`}}/>
                        </div>
                        <Navbar />
                        <div className='me-4' onClick={()=>setTheme(theme=="light"?"dark":"light")}>
                            {theme=="light"?<DarkModeIcon/>:<LightModeIcon sx={{color: 'white'}}/>}
                        </div>
                        <VerifiedIcon color='primary'/>
                        <div className='flex justify-center items-center me-2 hover:cursor-pointer' onClick={() => setOpen(!open)}>
                            <img src={profilePhoto} width={40} className='rounded-full ms-1' />
                        </div>
                    </div>
                    <div className='flex h-[90vh] '>
                        {open &&
                            <Profile />
                        }
                        <div className={`absolute z-10 w-fit h-[85vh] flex flex-col items-start mx-1 border-r p-1`}>
                            <div className='flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer'>
                                <AddCircleOutlineIcon sx={{color:`${theme=="dark" && 'white'}`}}/>
                                {drop && <p className={`ms-2 text-base font-medium ${theme=="dark" && 'text-white'}`}>Add Space</p>}
                            </div>
                            <div className='flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer'>
                                <SubscriptionsIcon sx={{color:`${theme=="dark" && 'white'}`}}/>
                                {drop && <p className={`ms-2 text-base font-medium ${theme=="dark" && 'text-white'}`}>Your Spaces</p>}
                            </div>
                            <div className='flex mb-4 rounded-xl hover:bg-indigo-500/50 p-2 w-full hover:cursor-pointer'>
                                <StarsIcon sx={{color:`${theme=="dark" && 'white'}`}}/>
                                {drop && <p className={`ms-2 text-base font-medium ${theme=="dark" && 'text-white'}`}>Get Pro</p>}
                            </div>
                            {drop ? <button className={`text-sm rounded-lg bg-indigo-500/50 p-2 mb-2 font-sans font-medium hover:shadow-lg hover:shadow-indigo-500 absolute bottom-0 self-center ${theme=="dark" && 'text-white'} `} onClick={() => { signOut({ callbackUrl: "/sign-in" }) }}><LogoutIcon sx={{color:`${theme=="dark" && 'white'}`}}/> Sign Out</button>
                                :
                                <div className="mb-4 rounded-xl hover:bg-indigo-500/50 p-2 absolute bottom-0" onClick={() => { signOut({ callbackUrl: "/sign-in" }) }}>
                                    <LogoutIcon sx={{color:`${theme=="dark" && 'white'}`}}/>
                                </div>
                            }
                        </div>
                        <div className='w-full h-full flex flex-col justify-center items-center opacity-50'>
                            <FolderCopyIcon color='primary' sx={{ fontSize: "100px" }} />
                            <p className='text-slate-500/100 text-3xl font-medium'>No Spaces</p>
                        </div>
                    </div>

                </div>
            </>
            :
            <div className='flex flex-col justify-center items-center h-[100vh] w-[100vw]'>
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