"use client";
import React, { useContext } from 'react'
import Navbar from '@/app/components/Navbar'
import { ThemeContext } from '@/app/context/ThemeProvider';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { SpaceFormSchema } from '@/validators/space-form-schema';

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
    <div className={`h-[100vh] w-[100vw] ${theme == "dark" ? 'bg-[rgb(13,13,13)]' : 'bg-white'}`}>
      <Navbar />
      <div>

      </div>
    </div>
  )
}

export default page