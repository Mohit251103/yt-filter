"use client";
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import { signIn } from 'next-auth/react';
import { ThemeContext } from '@/app/context/ThemeProvider';
import video_svg from "../../../../public/video_streaming.svg";

const Signup = () => {

    const { theme } = useContext(ThemeContext);
    return (
        <div className={`flex flex-row justify-center items-center h-[100vh] w-[100vw] ${theme == "dark" ? "bg-black" : ""}`}>

            <div className={`md:w-fit p-3 h-[50%] max-md:w-[80%] flex items-center justify-center ${theme == "dark" ? "bg-[rgb(13,13,13)] shadow-gray-200" : "bg-white shadow-black"} shadow-sm rounded-lg z-10`}>
                <button className={`text-xl rounded-xl p-2 flex border ${theme == "dark" ? "border-slate-200" : "border-[black]"} transition duration-300 hover:scale-[1.01] hover:shadow hover:shadow-black w-fit`} onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>
                    <img src="/icons8-google-48.png" width={30} height={30} />
                    <span className={`mx-2 ${theme === "dark" ? "text-slate-200" : "text-black"} `}>Sign Up using Google</span>
                </button>
            </div>
            <div className={` max-lg:hidden xl:left-[17vw] left-[25vw] rounded-r-lg flex items-center absolute h-[60vh] left-[25vw] z-1`}>
                <img src="video_streaming.svg" className='brightness-75 h-[100%]' alt="" />
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