"use client";
import { Space } from '@/app/components/space/Space'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { ThemeContext } from '@/app/context/ThemeProvider';

const page = () => {
    const { name } = useParams();
    const {theme} = useContext(ThemeContext);
    return (
        <div className={`h-[100vh] bg-${theme==="dark"?"[rgb(13,13,13)]":"white"}`}>
            <Navbar />
            <Space name={name as string} />
        </div>
    )
}

export default page