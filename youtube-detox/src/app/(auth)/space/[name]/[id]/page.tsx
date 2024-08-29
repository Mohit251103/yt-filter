"use client";
import { Space } from '@/app/components/space/Space'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { UserContext } from '@/app/context/UserProvider';
import { ThreeDots } from 'react-loader-spinner';
import { Footer } from '@/app/components/footer/Footer';
import { SidebarContext } from '@/app/context/SidebarContext';

const page = () => {
    const { name, id } = useParams();
    const { userId } = useContext(UserContext);
    // console.log(name,id,userId);
    const { theme } = useContext(ThemeContext);
    const {setDrop} = useContext(SidebarContext);
    return (
        <div className={`bg-${theme === "dark" ? "[rgb(13,13,13)]" : "white"}`}>
            <Navbar />
            {userId ?
                <div className='flex flex-col justify-center items-center overflow-x-hidden' onClick={()=>setDrop(false)}>
                    <Space id={id as string} userId={userId} />
                    <Footer/>
                </div>
                :
                <div className='h-[100vh] flex flex-col justify-center items-center'>
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
                </div>}
        </div>
    )
}

export default page