"use client";
import React, { useContext, useState } from 'react'
import Navbar from '@/app/components/Navbar'
import { ThemeContext } from '@/app/context/ThemeProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SpaceFormSchema } from '@/validators/space-form-schema';
import { Button } from '@mui/material';
import { Footer } from '@/app/components/footer/Footer';
import { SingleImageDropzone } from '@/app/components/SingleImageDropzone';
import { useEdgeStore } from '@/lib/edgestore';
import "../css/space.css"
import { SidebarContext } from '@/app/context/SidebarContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import options from '@/app/api/auth/[...nextauth]/options';
import { UserContext } from '@/app/context/UserProvider';

const page = () => {
  const { theme } = useContext(ThemeContext);
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();
  const {userId} = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(SpaceFormSchema),
  });

  const [space, setSpace] = useState({
    title: "",
    category: "",
    description: "",
    photo: "",
    tags: "",
    needShorts: "0"
  });

  const handleChange = (e: any) => {
    e.preventDefault()
    setSpace({ ...space, [e.target.name]: e.target.value })
  }

  const submitSpace = async () => {
    try {
      
      const res = await axios.post(`/api/space/c?id=${userId}`,space);
      toast.success("Space created successfully");
    } catch (error:any) {
      toast.error("Some error occured");
      console.log(error);
    }
    
  }

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const {drop,setDrop,open,setOpen} = useContext(SidebarContext);

  return (
    <div className={`h-[100vh] ${theme == "dark" ? 'bg-[rgb(13,13,13)]' : 'bg-white'} overflow-hidden`}>
      <Navbar />
      <div className='flex flex-col justify-center items-center h-[92vh]' onClick={()=>{setDrop(false); setOpen(false)}}>
        <div className='flex flex-col p-4 w-[400px] sm:w-[500px] h-fit overflow-y-auto oveflow-x-hidden'>
          <h1 className={`text-4xl font-extrabold text-center my-2 ${theme == "dark" && "text-white"}`}>Add Space</h1>
          <form onSubmit={handleSubmit(submitSpace)} className={`flex flex-col mb-2`}>

            <div className='m-2'>
              <label htmlFor="title" className={`text-sm font-bold ${theme == "dark" && "text-white"}`}>Title *</label>
              <input type='text' {...register("title")} className={`border rounded-md text-sm focus:border-sky-500 focus:outline-none p-2 w-full ${theme == "dark" ? "bg-black text-gray-300" : ""}`} placeholder='ex. Web Dev Learn Space' value={space.title} onChange={handleChange} name='title'/>
              {errors.title?.message && <p className='text-sm text-[red]'>{errors.title?.message.toString()}</p>}
            </div>

            <div className='m-2'>
              <label htmlFor="category" className={`text-sm font-bold ${theme == "dark" && "text-white"}`}>What do you want to see in this space? *</label>
              <input type='text' {...register("category")} id='category' className={`border rounded-md text-sm focus:border-sky-500 focus:outline-none p-2 w-full ${theme == "dark" ? "bg-black text-gray-300" : ""}`} placeholder='ex. Reactjs' value={space.category} onChange={handleChange} name='category' />
              {errors.category?.message && <p className='text-sm text-[red]'>{errors.category?.message.toString()}</p>}
            </div>

            <div className='m-2'>
              <label htmlFor="description" className={`text-sm font-bold ${theme == "dark" && "text-white"}`}>Description</label>
              <textarea {...register("description")} rows={3} id='description' className={`border rounded-md text-sm focus:border-sky-500 focus:outline-none p-2 w-full ${theme == "dark" ? "bg-black text-gray-300" : ""} h-24 text-start`} placeholder='ex. This space was created for...' value={space.description} onChange={handleChange} name='description' />
              {errors.description?.message && <p className='text-sm text-[red]'>{errors.description?.message.toString()}</p>}
            </div>

            <div className='m-2'>
              <label htmlFor="photo" className={`text-sm font-bold ${theme == "dark" && "text-white"}`}>Space Thumbnail</label>
              <SingleImageDropzone
                width={100}
                height={50}
                value={file}
                onChange={(file) => {
                  setFile(file);
                }}
              />
              <div className={`w-[50%] h-[5px] m-2 border ${theme == "dark" ? "border-white" : "border-black"} overflow-hidden ${!showProgress && "hidden"}`}>
                <div className={`h-full transition duration-300 ${theme == "dark" ? "bg-white" : "bg-black"}`} style={{ width: `${progress}%` }}></div>
              </div>
              <button
                onClick={async (e:any) => {
                  e.preventDefault();
                  if (file) {
                    setShowProgress(true);
                    const res = await edgestore.publicFiles.upload({
                      file,
                      onProgressChange: (progress) => {
                        setProgress(progress);
                        if (progress == 100) {
                          setShowProgress(false);
                        }
                      },
                    });
                    
                    setSpace({...space,photo:res.url})
                  }
                }
                }
                className={`${"hover:bg-[rgb(25,118,210)] hover:text-white text-[rgb(25,118,210)] border-[rgb(25,118,210)]"} border-2 rounded-md font-semibold h-fit w-fit sm:text-xs md:text-sm p-1 `}
              >
                Upload
              </button>
            </div>

            <div className='m-2'>
              <label htmlFor="tag" className={`text-sm font-bold ${theme == "dark" && "text-white"}`}>Tags</label>
              <input type='text' {...register("tags")} id='tag' className={`border rounded-md text-sm focus:border-sky-500 focus:outline-none p-2 w-full ${theme == "dark" ? "bg-black text-gray-300" : ""}`} placeholder='ex. #coding#webdev' value={space.tags} onChange={handleChange} name='tags' />
              {errors.tags?.message && <p className='text-sm text-[red]'>{errors.tags?.message.toString()}</p>}
            </div>

            <div className='m-2'>
              <p className={`text-sm font-bold ${theme == "dark" && "text-white"}`}>Want to see shorts?</p>
              <input type='radio' {...register("needShorts")} id='yes' className={`text-sm ml-2 ${theme == "dark" ? "bg-black text-gray-300" : ""}`} value='1' name='needShorts' onChange={(e: any) => e.target.checked && setSpace({ ...space, [e.target.name]: e.target.value })} checked/>
              <label id='yes' className={`text-sm ml-1 ${theme == "dark" && "text-white"}`}>Yes</label>

              <input type='radio' {...register("needShorts")} id='no' className={`text-sm ml-2 ${theme == "dark" ? "bg-black text-gray-300" : ""}`} value='1' name='needShorts' onChange={(e: any) => e.target.checked && setSpace({ ...space, [e.target.name]: e.target.value })} />
              <label id='no' className={`text-sm ml-1 ${theme == "dark" && "text-white"}`}>No</label>
              {/* {errors.needShorts?.message && <p className='text-sm text-[red]'>{errors.needShorts?.message.toString()}</p>} */}
            </div>
            <Button variant='contained' className='mt-3' type='submit'>Create</Button>
          </form>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default page