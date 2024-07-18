"use client";
import { createContext, useState } from "react";

interface ThemeContextType{
    theme:string,
    setTheme:React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextType>({ theme: "", setTheme: ()=>{}});


const ThemeProvider = ({
    children
}: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState("light");
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export {ThemeProvider,ThemeContext};