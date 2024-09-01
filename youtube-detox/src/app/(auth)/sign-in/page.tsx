"use client";
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { signIn } from 'next-auth/react';
import { ThemeContext } from '@/app/context/ThemeProvider';

const Signup = () => {

    const { theme } = useContext(ThemeContext);
    return (
        <div className='flex flex-row justify-center items-center h-[100vh] w-[100vw]'>

            <div className='md:w-[40%] w-full m-auto h-full bg-white flex flex-col justify-center items-center relative'>
                {theme == "light" && <img src='/filtered2.png' className='md:w-[10vw] w-[20vw] absolute top-3'></img>}
                {theme === "dark" && <img src='/filtered-dark.png' className='md:w-[13vw] w-[20vw] absolute top-3' />}
                <button className='text-xl rounded-xl p-2 flex border border-[black] transition duration-300 hover:scale-[1.01] hover:shadow hover:shadow-black w-fit' onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
                    <img src="/icons8-google-48.png" width={30} height={30} />
                    <span className={`mx-2 ${theme === "dark" ? "text-black" : ""} `}>Sign Up using Google</span>
                </button>
            </div>
            <div className={`md:w-[60%] md:h-full max-md:hidden`}>
                <img src="https://images.unsplash.com/photo-1611162616475-46b635cb6868?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className='h-full brightness-75 w-full' alt="" />
            </div>

            {/* <div className='flex flex-row w-[40%] h-[50%] rounded-lg'>
                <div className='rounded-l-lg bg-red-500 h-full w-full flex flex-col justify-center items-center p-5 text-white '>
                    <p className='text-5xl my-3 font-bold'>Sign Up</p>
                </div>
                <div className='flex flex-col justify-center items-center rounded-r-lg bg-white h-full w-full p-5 relative'>
                    <button className='text-xl rounded-xl p-2 flex border border-[black] transition duration-300 hover:scale-[1.01] hover:shadow hover:shadow-black lg:w-[]' onClick={()=>signIn("google",{callbackUrl:"/dashboard"})}>
                        <img src="/icons8-google-48.png" width={30} height={30} />
                        <span className={`mx-2 ${theme==="dark"? "text-black":""} `}>Sign Up using Google</span>
                    </button>
                </div>
            </div> */}
        </div>
    )
}

export default Signup