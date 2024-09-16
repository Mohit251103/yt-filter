import { ThemeContext } from "@/app/context/ThemeProvider"
import Link from "next/link"
import { useContext } from "react"

export const Nav = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const navItems = [
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>,
            title: "Github",
            link: "https://github.com/Mohit251103/yt-filter"
        },
        {
            svg: <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-twitter"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>,
            title: "Twitter",
            link: "https://x.com/mnegi_/"
        }
    ]
    return (
        <div className={`w-[70%] mt-10 flex justify-between items-center ${theme=="dark"?"text-white":"text-black"}`}>
            <div>
                <p className="text-2xl font-extrabold">filtered<span className="text-red-600">.</span></p>
            </div>
            <div className="flex items-center">
                {
                    navItems.map((element, index) => {
                        return (
                            <div key={index} className="text-sm font-semibold mx-2 hover:opacity-60 rounded-3xl ">
                                <Link href={element.link} className="flex">
                                    <span className="mx-1">{element.svg}</span>
                                    <p className="max-sm:hidden">{element.title}</p>
                                </Link>
                            </div>
                        )
                    })
                }
                {theme == "dark" ? <div onClick={()=>setTheme("light")} className="ml-2 hover:opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-sun-medium"><circle cx="12" cy="12" r="4" /><path d="M12 3v1" /><path d="M12 20v1" /><path d="M3 12h1" /><path d="M20 12h1" /><path d="m18.364 5.636-.707.707" /><path d="m6.343 17.657-.707.707" /><path d="m5.636 5.636.707.707" /><path d="m17.657 17.657.707.707" /></svg>
                </div> :
                    <div onClick={()=>setTheme("dark")} className="ml-2 hover:opacity-60">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-moon"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>
                    </div>
                }
            </div>
        </div>
    )
}