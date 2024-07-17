import React from 'react'
import SettingsIcon from '@mui/icons-material/Settings';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Profile = () => {
  return (
    <div className='absolute z-10 right-0 me-2 flex flex-col w-fit border-2'>
        <p className='p-1 text-sm m-2 hover:cursor-pointer hover:bg-indigo-500/50'><AccountCircleIcon/> Profile</p>
        <p className='p-1 text-sm m-2 hover:cursor-pointer hover:bg-indigo-500/50'><SettingsIcon/> Settings</p>
        {/* <p className='w-full text-sm'>Profile</p>
        <p className='w-full text-sm'>Profile</p> */}
    </div>
  )
}

export default Profile