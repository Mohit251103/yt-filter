import React from 'react'
import AddIcon from '@mui/icons-material/Add';
// import { signOut } from 'next-auth/react';

const Navbar = () => {
    
    return (
        <div className='flex justify-between w-full h-[5vh] my-2'>
            <div className='flex justify-center items-center mx-1'>
                <img src="/filtered2.png" alt="" width={100} height={100} />
            </div>
            {/* <div className='flex justify-center items-center mx-1 rounded-l-full rounded-r-full bg-indigo-500/50 pr-2 hover:shadow-lg hover:shadow-indigo-500'>
                <div className='rounded-full bg-white mx-1 hover:cursor-pointer hover:motion-safe:animate-bounce'>
                    <AddIcon />
                </div>
                <p className='text-lg font-semibold'>Add Space</p>
            </div> */}
            
        </div>
    )
}

export default Navbar