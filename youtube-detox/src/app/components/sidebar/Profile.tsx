import React, { useContext } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { blueGrey } from '@mui/material/colors';

const Profile = () => {
  const {theme,setTheme} = useContext(ThemeContext);
  return (
    <div className={`absolute z-10 right-0 me-2 flex flex-col w-fit border-2 ${theme=="dark"?'text-white bg-[rgb(13,13,13)]':"bg-white text-black"}`}>
        <p className='p-1 text-sm m-2 hover:cursor-pointer hover:bg-indigo-500/50'><AccountCircleIcon sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }}/> Profile</p>
        <p className='p-1 text-sm m-2 hover:cursor-pointer hover:bg-indigo-500/50'><SettingsIcon sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }}/> Settings</p>
        {/* <p className='w-full text-sm'>Profile</p>
        <p className='w-full text-sm'>Profile</p> */}
    </div>
  )
}

export default Profile