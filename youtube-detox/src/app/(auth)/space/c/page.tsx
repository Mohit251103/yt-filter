"use client";
import React, { useContext } from 'react'
import Navbar from '@/app/components/Navbar'
import { ThemeContext } from '@/app/context/ThemeProvider';

const page = () => {
  const {theme} = useContext(ThemeContext);
  return (
    <div className={`h-[100vh] w-[100vw] ${theme=="dark"?'bg-[rgb(13,13,13)]':'bg-white'}`}>
      <Navbar/>
    </div>
  )
}

export default page