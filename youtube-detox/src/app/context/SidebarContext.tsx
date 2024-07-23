"use client";
import React,{ createContext, useState } from "react";

interface SidebarContextType {
    open:boolean,
    setOpen:React.Dispatch<React.SetStateAction<boolean>>,
    drop:boolean,
    setDrop:React.Dispatch<React.SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContextType>({
    open:false,
    setOpen:()=>{},
    drop:false,
    setDrop:()=>{}
});

export const SidebarContextProvider = ({children}:{children:React.ReactNode}) => {
    const [drop,setDrop] = useState(false);
    const [open,setOpen] = useState(false);
    return (
        <SidebarContext.Provider value={{open,setOpen,drop,setDrop}}>
            {children}
        </SidebarContext.Provider>
    )
}