"use client";
import React,{useEffect} from 'react'
import { useSession,signOut } from "next-auth/react"
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';

const Dashboard = () => {
    const {data:session} = useSession();
    const router = useRouter();
    // useEffect(() => {
    //   if(!session?.user?.username){
    //     router.push("/profile/edit/?type=first-time");
    //   }
    // }, [])
    
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