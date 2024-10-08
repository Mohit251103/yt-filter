"use client";
import { Space } from '@/app/components/space/Space'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { UserContext } from '@/app/context/UserProvider';
import { ThreeDots } from 'react-loader-spinner';
import { SidebarContext } from '@/app/context/SidebarContext';

const page = () => {
    const { name, id } = useParams();
    const { userId } = useContext(UserContext);
    // console.log(name,id,userId);
    const { theme } = useContext(ThemeContext);
    const {setDrop, setOpen} = useContext(SidebarContext);
    return (
        <div className={`bg-${theme === "dark" ? "[rgb(13,13,13)]" : "white"}`}>
            <Navbar />
            {userId ?
                <div className='flex flex-col justify-center items-center overflow-x-hidden' onClick={()=>{setDrop(false); setOpen(false);}}>
                    <Space id={id as string} userId={userId} />
                </div>
                :
                <div className={`flex flex-col justify-center items-center h-[100vh] w-[100vw] ${theme == "light" ? 'bg-white' : 'bg-[rgb(13,13,13)]'}`}>
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
}
        </div>
    )
}

export default page