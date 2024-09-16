"use client";
import { poppins } from "@/app/ui/fonts"
import { useRouter } from "next/navigation";
import "@/app/components/landing/custom.css";
import { useContext } from "react";
import { ThemeContext } from "@/app/context/ThemeProvider";
import { signIn } from "next-auth/react";

export const Hero = () => {
    const navigate = useRouter();
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <div className={`max-md:mt-32 md:mt-52  text-black flex flex-col items-center max-w-5xl ${theme=="dark"?"text-white":"text-black"}`}>
            <div className="text-center text-3xl sm:text-5xl md:text-6xl lg:text-7xl  font-black ">
                <p className={`${poppins.className}`}>Fed up of unwanted videos on <span className="text-red-400">Youtube</span> feeds</p>
            </div>
            <div className="sm:text-xl text-gray-600 text-center mt-5 max-sm:w-[80%]">
                <p className={`${poppins.className}`}>Create your own personalised feed and remove your distraction</p>
            </div>
            <div className="flex items-center justify-center mt-5 border-white border-2 rounded-md">
                <button className="rounded-md text-sm p-3  bg-black text-white hover:opacity-80" onClick={()=>{ signIn()}}>
                    Get Started
                </button>
            </div>
        </div>
    )
}