import React from 'react'
import AddIcon from '@mui/icons-material/Add';
import { useContext } from 'react';
import { UserContext } from '../context/UserProvider';
import { signOut } from 'next-auth/react';

const Navbar = () => {
    const { profilePhoto, username }: { profilePhoto: string, username: string } = useContext(UserContext);
    return (
        <div className='flex justify-between w-full h-[5%] my-2'>
            <div className='flex justify-center items-center mx-1'>
                <img src="/filtered2.png" alt="" width={100} height={100} />
            </div>
            <div className='flex justify-center items-center mx-1 rounded-l-full rounded-r-full bg-indigo-500/50 pr-2 '>
                <div className='rounded-full bg-white mx-1 hover:cursor-pointer hover:motion-safe:animate-bounce'>
                    <AddIcon />
                </div>
                <p className='text-xl font-semibold'>Add Space</p>
            </div>
            <div className='flex justify-center items-center mx-1'>
                <p className='text-lg font-bold mx-2'>{username}</p>
                <img src={profilePhoto} width={40} className='rounded-full' />
                <button className='text-sm rounded-lg bg-indigo-500/50 p-2 mx-2 font-sans font-medium' onClick={() => { signOut({ callbackUrl: "/sign-in" }) }}>Sign Out</button>
            </div>
        </div>
    )
}

export default Navbar