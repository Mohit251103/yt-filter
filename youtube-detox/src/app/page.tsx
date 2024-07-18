"use client";
import React from 'react'
import { useRouter } from 'next/navigation'

const Home = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center items-center bg-indigo-500/50 h-[100vh] w-[100vw]'>
      <p className='flex justify-center items-center text-4xl font-bold text-white w-full'>
        Welcome to <span className=''><img src={"/filtered2.png"} width={150}/></span>
      </p>
      <button className='rounded-xl p-2 font-medium border-2 border-white text-white bg-none hover:bg-black' onClick={()=> router.push("/sign-in")}>Sign In</button>
    </div>
  )
}

export default Home
