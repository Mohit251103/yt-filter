"use client";
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Nav } from './components/landing/Nav';
import { Hero } from './components/landing/Hero';
import "./components/landing/custom.css";
import { ThemeContext } from './context/ThemeProvider';

const Home = () => {
  const router = useRouter();
  const {theme, setTheme} = useContext(ThemeContext);
  return (
    <div className={`flex flex-col items-center h-[100vh] w-[100vw] ${theme=="dark"?"bg-black text-white":"bg-cyan-50"}`}>
      <Nav/>
      <Hero/>
    </div>
  )
}

export default Home
