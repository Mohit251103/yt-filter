"use client";
import React, { useEffect, useState } from 'react'
import { useSession, signOut } from "next-auth/react"
// import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import Cookies from "js-cookie";
import { ThreeDots } from 'react-loader-spinner';

const Dashboard = () => {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        setLoading(false);
    }, [session])

    return (
        <div className='flex flex-col justify-center items-center h-[100vh] w-[100vw]'>
            {!loading ?
                <>
                    <div className='rounded-full overflow-hidden'>
                        <img src={session?.user?.image} alt="" />
                    </div>
                    <p className='font-bold text-xl text-red-500'>{Cookies.get('username') || session?.user.username}</p>
                    <Button onClick={() => {
                        Cookies.remove('username')
                        signOut({ callbackUrl: "/sign-in" });
                    }}>Sign Out</Button></>
                :
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
            }
        </div>
    )
}

export default Dashboard