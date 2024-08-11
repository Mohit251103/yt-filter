import { ThemeContext } from "@/app/context/ThemeProvider"
import { useContext } from "react"

export const Footer = () => {
    const {theme} = useContext(ThemeContext);
    return <div className={`p-1 ${theme=="dark"?"bg-[rgb(13,13,13)]":"bg-white"}`}>
        <p className="text-center text-sm text-gray-300">Copyright&copy; 2024 Filtered.</p>
    </div>
}