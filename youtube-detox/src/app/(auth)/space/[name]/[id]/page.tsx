"use client";
import { Space } from '@/app/components/space/Space'
import React, { useContext } from 'react'
import { useParams } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { UserContext } from '@/app/context/UserProvider';
import { ThreeDots } from 'react-loader-spinner';

const page = () => {
    const { name,id } = useParams();
    const {userId} = useContext(UserContext);
    // console.log(name,id,userId);
    const {theme} = useContext(ThemeContext);
    return (
        <div className={`h-[100vh] bg-${theme==="dark"?"[rgb(13,13,13)]":"white"}`}>
            <Navbar />
            {userId?<Space name={name as string} id={id as string} userId={userId}/>
            :
            <div className='flex flex-col justify-center items-center'>
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