"use client";
import React, { useEffect, useState } from 'react'
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

const Dashboard = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [drop,setDrop] = useState(false);
    useEffect(() => {
        setLoading(false);
    }, [session])

    return (

        !loading ?
            <>
                <div className='bg-white h-[100vh] w-[100vw]'>
                    <div className='flex items-center '>
                        <div className='rounded-full hover:cursor-pointer hover:rotate-180 transition hover:duration-1000' onClick={(e)=>{e.preventDefault(); setDrop(!drop)}}>
                            <MenuIcon className='mx-1'/>
                        </div>
                        <Navbar />
                    </div>
                    <div className='flex'>
                        <div className='w-fit flex flex-col w-full mx-1 border-r p-1'>
                            <div className='flex mb-4'>
                                <AddCircleOutlineIcon/> 
                                {drop && <p className='ms-2 text-base font-medium'>Add Space</p>}
                            </div>
                            <div className='flex mb-4'>
                                <SubscriptionsIcon/>
                                {drop && <p className='ms-2 text-base font-medium'>Your Spaces</p>}
                            </div>
                            <div className='flex mb-4'>
                                <StarsIcon/>
                                {drop && <p className='ms-2 text-base font-medium'>Get Pro</p>}
                            </div>
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