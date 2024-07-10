"use client";
import React from 'react'
import { useSession,signOut } from "next-auth/react"
import { Button } from '@mui/material';

const Dashboard = () => {
    const {data:session} = useSession();
    console.log(session);
    return (
        <div className='flex flex-col justify-center items-center h-[100vh] w-[100vw]'>
            <div className='rounded-full overflow-hidden'>
                <img src={session?.user?.image} alt="" />
            </div>
            <Button onClick={()=>signOut({callbackUrl:"/sign-in"})}>Sign Out</Button>
        </div>
    )
}

export default Dashboard