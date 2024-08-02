import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { open_sans } from "./ui/fonts";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import UserProvider from "./context/UserProvider";
import { Toaster } from "react-hot-toast"
import { ThemeProvider } from "./context/ThemeProvider";
import { SidebarContext, SidebarContextProvider } from "./context/SidebarContext";
import { useContext } from "react";
import { roboto } from "./ui/fonts";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "filtered.",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
   
  return (
    <AuthProvider>
      <ThemeProvider>
        <UserProvider>
          <SidebarContextProvider>
            <html lang="en">
              <body className={`${open_sans.className} antialiased`}>
                <Toaster />
                {children}
              </body>
            </html>
          </SidebarContextProvider>
        </UserProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
