import React, { useContext } from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { ThemeContext } from '@/app/context/ThemeProvider';
import { blueGrey } from '@mui/material/colors';
import { useSession } from 'next-auth/react';
import { signOut } from 'next-auth/react';
import LogoutIcon from '@mui/icons-material/Logout';
import { SidebarContext } from '@/app/context/SidebarContext';

const Profile = () => {
  const { theme, setTheme } = useContext(ThemeContext);
  const { data: session } = useSession();
  const {setOpen} = useContext(SidebarContext);
  return (
    <div className='fixed bg-black backdrop-blur-sm bg-opacity-25 w-full h-full top-0 left-0 flex justify-center items-center'>
      <div className={`w-[200px] h-fit ${theme == "dark" ? "bg-black text-slate-200" : "bg-white border-2 text-black"} rounded-lg p-6 flex flex-col justify-center items-center absolute relative`}>
        <div className='absolute top-1 right-1' onClick={()=>{ setOpen(false); }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
        </div>
        <div className='m-3 rounded-full'>
          <img className={`rounded-full border-4 ${theme == "dark" ? "border-[white]" : "border-black"} w-[70px] h-[70px]`} src={session?.user.image} alt="profile pic" />
        </div>

        <div className={`text-sm font-bold mb-2`}>{session?.user.username}</div>

        <button className='p-2 border-indigo-600 border-2 hover:bg-indigo-500 text-white-100 rounded-lg hover:scale-105 text-sm font-semibold hover:text-white' onClick={() => { signOut({ callbackUrl: "/" }) }}>
          <LogoutIcon />Log Out</button>
      </div>
    </div>
  )
}

export default Profile