"use client";
import { poppins } from "@/app/ui/fonts"
import { useRouter } from "next/navigation";

export const Hero = () => {
    const navigate = useRouter();
    return (
        <div className=" max-sm:mt-32 md:mt-52  text-black ">
            <div className="text-center text-5xl font-black ">
                <p className={`${poppins.className}`}>Fed up of unwanted videos on <span className="text-red-400">Youtube</span> feeds</p>
            </div>
            <div className="text-2xl font-semibold text-gray-600 text-center mt-5">
                <p className="">Create your own personalised feed and remove your distraction</p>
            </div>
            <div className="flex items-center justify-center mt-5">
                <button className="rounded-md text-sm p-3  bg-black text-white hover:opacity-80" onClick={()=>{ navigate.push('/sign-in')}}>
                    Get Started
                </button>
            </div>
        </div>
    )
}