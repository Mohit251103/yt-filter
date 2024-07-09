"use client";
import Link from 'next/link'
import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';

const Signup = () => {
    const [open,setOpen] = useState(true);

    const handlePopup = () => {
        setOpen(false);
    }
    return (
        <div className='flex flex-col justify-center items-center h-[100vh] w-[100vw]'>
            <img src='/filtered2.png'></img>
            <div className='flex flex-row w-[40%] h-[50%] rounded-lg'>
                <div className='rounded-l-lg bg-red-500 h-full w-full flex flex-col justify-center items-center p-5 text-white '>
                    <p className='text-5xl my-3 font-bold'>Sign Up</p>
                    {/* <p className='text-2xl font-bold'>Welcome to </p> */}
                </div>
                <div className='flex flex-col justify-center items-center rounded-r-lg bg-white h-full w-full p-5 relative'>
                    <button className='text-xl rounded-xl p-2 flex border border-[black] transition duration-300 hover:scale-[1.01] hover:shadow hover:shadow-black'>
                        <img src="/icons8-google-48.png" width={30} height={30} />
                        <span className='mx-2'>Sign Up using Google</span>
                    </button>
                    <Link href="/login" className='text-sm font-semibold underline my-2'>Existing User? Login to your account</Link>
                    {open && <div className='text-slate-500 text-sm absolute bottom-0 p-3 text-center bg-yellow-500/50 m-2'>
                        <span className='absolute top-0 right-0 hover:cursor-pointer' onClick={handlePopup}>
                            <CloseIcon></CloseIcon>
                        </span>
                        Only Google Oauth is provided in order to prevent any problem to fetch the content from your youtube account though Google API
                    </div>}
                </div>
            </div>
        </div>
    )
}

export default Signup