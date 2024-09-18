import React, { useContext } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { blueGrey } from '@mui/material/colors';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile = () => {
  const {theme,setTheme} = useContext(ThemeContext);
  const {data:session} = useSession();
  return (
    <div className={`w-[150px] h-fit ${theme=="dark"?"bg-black text-slate-200": "bg-white border-2 text-black"} rounded-lg p-6 flex flex-col justify-center items-center absolute right-1`}>
      <div className='m-3 rounded-full'>
        <img className={`rounded-full border-4 ${theme=="dark"?"border-[white]": "border-black"}`} src={session?.user.image} alt="profile pic" />
      </div>

      <div className={`text-sm font-bold mb-2`}>{session?.user.username}</div>

      <button className='p-2 border-indigo-600 border-2 hover:bg-indigo-500 text-white-100 rounded-lg hover:scale-105 text-sm font-semibold hover:text-white' onClick={() => { signOut({ callbackUrl: "/" }) }}>
        <LogoutIcon sx={{ color: `${theme == "dark"?blueGrey[50]:blueGrey[900]}` }}/>Log Out</button>
    </div>
  )
}

export default Profile