"use client";
import React from 'react'
import { useRouter } from 'next/navigation'
import { Nav } from './components/landing/Nav';
import { Hero } from './components/landing/Hero';

const Home = () => {
  const router = useRouter();
  return (
    <div className='flex flex-col items-center bg-cyan-50 h-[100vh] w-[100vw]'>
      <Nav/>
      <Hero/>
    </div>
  )
}

export default Home
