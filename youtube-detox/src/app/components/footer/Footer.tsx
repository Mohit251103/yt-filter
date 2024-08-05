import { ThemeContext } from "@/app/context/ThemeProvider"
import { useContext } from "react"

export const Footer = () => {
    const {theme} = useContext(ThemeContext);
    return <div className={`w-[100vw] p-1 ${theme=="dark"?"bg-[rgb(13,13,13)] text-gray-300":"bg-white"}`}>
        <p className="text-center text-sm">Copyright&copy; 2024 Filtered.</p>
    </div>
}