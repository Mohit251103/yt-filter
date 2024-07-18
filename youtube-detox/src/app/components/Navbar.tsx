import React, { useContext } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { ThemeContext } from '../context/ThemeProvider';
// import { signOut } from 'next-auth/react';

const Navbar = () => {
    const {theme} = useContext(ThemeContext);
    return (
        <div className='flex justify-between w-full h-[5vh] my-2'>
            <div className={`flex justify-center items-center mx-1 transition duration-500 hover:-rotate-3`}>
                <img src={theme=="light"?"/filtered2.png":"/filtered-dark.png"} alt="" width="100" />
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