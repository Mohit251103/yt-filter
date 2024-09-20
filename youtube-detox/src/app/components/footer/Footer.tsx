"use client";
import { ThemeContext } from "@/app/context/ThemeProvider"
import Link from "next/link";
import { useContext } from "react"
import { poppins } from "@/app/ui/fonts";

export const Footer = () => {
    const { theme } = useContext(ThemeContext);
    return <div className={`p-1 ${theme == "dark" ? "text-slate-300" : "text-black"} bg-none mt-3`}>
        <p className="text-center text-sm flex justify-center items-center">Made with <span className="mx-1"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="heart">
            <path fill="#f05542" d="M5.301 3.002c-.889-.047-1.759.247-2.404.893-1.29 1.292-1.175 3.49.26 4.926l.515.515L8.332 14l4.659-4.664.515-.515c1.435-1.437 1.55-3.634.26-4.926-1.29-1.292-3.483-1.175-4.918.262l-.516.517-.517-.517C7.098 3.438 6.19 3.049 5.3 3.002z"></path>
        </svg></span> by <span className={`border-b-2 ${theme=="dark"?"border-white":"border-black"}`}><Link href="https://github.com/mohit251103" className={`italic ${poppins.className} focus:text-blue active:text-purple items-center mx-1`}> Mohit Negi</Link></span></p>
    </div>
}