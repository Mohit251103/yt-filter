"use client"
import { createContext } from "react";
import { useSession } from "next-auth/react";

export const UserContext = createContext({email:"", profilePhoto:"", username:""});

export default function UserProvider({
    children,
  }: {
    children: React.ReactNode
  }) {

    const {data:session} = useSession();

    return <UserContext.Provider value={{email:session?.user.email, profilePhoto:session?.user.image, username: session?.user.username}}>{children}</UserContext.Provider>
  }