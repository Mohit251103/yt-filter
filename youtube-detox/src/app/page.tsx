"use client";
import React, { useContext } from 'react'
import { useRouter } from 'next/navigation'
import { Nav } from './components/landing/Nav';
import { Hero } from './components/landing/Hero';
import "./components/landing/custom.css";
import { ThemeContext } from './context/ThemeProvider';
import { Footer } from './components/footer/Footer';
import { Feature } from './components/landing/Feature';

const Home = () => {
  const router = useRouter();
  const {theme, setTheme} = useContext(ThemeContext);
  return (
    <div className={`flex flex-col items-center ${theme=="dark"?"bg-black text-white":"bg-cyan-50"} overflow-hidden`}>
      <Nav/>
      <Hero/>
      <Feature/>
    </div>
  )
}

export default Home
