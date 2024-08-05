"use client";
import React, { useContext } from 'react'
import Navbar from '@/app/components/Navbar'
import { ThemeContext } from '@/app/context/ThemeProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SpaceFormSchema } from '@/validators/space-form-schema';
import { Button } from '@mui/material';
import { Footer } from '@/app/components/footer/Footer';

const page = () => {
  const { theme } = useContext(ThemeContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SpaceFormSchema),
  });
  return (
    <div className={`h-[100vh] w-[100vw] ${theme == "dark" ? 'bg-[rgb(13,13,13)]' : 'bg-white'} relative`}>
      <Navbar />
      <div className='flex justify-center items-center h-[90%]'>
        <div className='flex flex-col p-4 w-[25%] h-fit'>
          <h1 className={`text-4xl font-extrabold text-center mb-4 ${theme == "dark" && "text-white"}`}>Add Space</h1>
          <form onSubmit={() => handleSubmit} className={`flex flex-col`}>
            <div className='m-2'>
              <label htmlFor="title" className={`text-sm font-bold ${theme=="dark" && "text-white"}`}>Title *</label>
              <input type='text' {...register("title")} className={`border rounded-md text-sm focus:border-sky-500 focus:outline-none p-2 w-full ${theme=="dark"?"bg-black text-gray-300":""}`} placeholder='ex. Reactjs'></input>
              {errors.title?.message && <p className='text-sm text-[red]'>{errors.title?.message.toString()}</p>}
            </div>
            <div className='m-2'>
              <label htmlFor="category" className={`text-sm font-bold ${theme=="dark" && "text-white"}`}>Category *</label>
              <input type='text' {...register("category")} id='category' className={`border rounded-md text-sm focus:border-sky-500 focus:outline-none p-2 w-full ${theme=="dark"?"bg-black text-gray-300":""}`} placeholder='ex. entertainment, education...' />
              {errors.category?.message && <p className='text-sm text-[red]'>{errors.category?.message.toString()}</p>}
            </div>
            <div className='m-2'>
              <label htmlFor="photo" className={`text-sm font-bold ${theme=="dark" && "text-white"}`}>Space Photo</label>
              <input type='file' {...register("displayPhoto")} id="photo" className={`border rounded-md text-sm focus:border-sky-500 focus:outline-none p-2 w-full ${theme=="dark"?"bg-black text-gray-300":""}`}/>
              {errors.displayPhoto?.message && <p className='text-sm text-[red]'>{errors.displayPhoto?.message.toString()}</p>}
            </div>
            <div className='m-2'>
              <label htmlFor="tag" className={`text-sm font-bold ${theme=="dark" && "text-white"}`}>Tags</label>
              <input type='text' {...register("tags")} id='tag' className={`border rounded-md text-sm focus:border-sky-500 focus:outline-none p-2 w-full ${theme=="dark"?"bg-black text-gray-300":""}`} placeholder='ex. #coding#webdev' />
              {errors.tags?.message && <p className='text-sm text-[red]'>{errors.tags?.message.toString()}</p>}
            </div>
            <div className='m-2'>
              <label htmlFor="shortsneed" className={`text-sm font-bold ${theme=="dark" && "text-white"}`}>Want to see shorts?</label>
              <input type='radio' {...register("tags")} id='yes' className={`text-sm ml-2 ${theme=="dark"?"bg-black text-gray-300":""}`} />
              <label id='yes' className={`text-sm ml-1 ${theme=="dark" && "text-white"}`}>Yes</label>
              <input type='radio' {...register("tags")} id='no' className={`text-sm ml-2 ${theme=="dark"?"bg-black text-gray-300":""}`} />
              <label id='no' className={`text-sm ml-1 ${theme=="dark" && "text-white"}`}>No</label>
              {errors.needShorts?.message && <p className='text-sm text-[red]'>{errors.needShorts?.message.toString()}</p>}
            </div>
            {/* <div className='m-2'>
              <label htmlFor="theme" className={`text-sm font-bold ${theme=="dark" && "text-white"}`}>Theme</label>
              <select id="theme" className={`text-sm px-2 py-1 ml-2 rounded-sm ${theme=="dark"?"bg-black text-white":""}`}>
                <option value="light" selected>Light</option>
                <option value="dark">Dark</option>
              </select>
              {errors.theme?.message && <p className='text-sm text-[red]'>{errors.theme?.message.toString()}</p>}
            </div> */}
            <Button variant='contained' className='mt-3'>Create</Button>
          </form>
        </div>
      </div>
      <Footer/>
    </div>
  )
}

export default page