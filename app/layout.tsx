"use client"

import { useState } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { CircleUserRound, Fish, ChevronDown, Search, LayoutGrid, Map, Bot, Users, MessageCircle, Bell } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [userModal, userModalOpen] = useState(false);



  return (
    <html lang="en">
      <title>Fish Forecast</title>
      <body className=" overflow-hidden">
        <header className="w-screen h-20 bg-[#051420] flex flex-row border-b-[1.5px] border-[#162A39]">
          <div className="flex flex-row mt-3 ml-4">
            <Fish className="w-7 h-7 text-[#15EEED] mt-3"/>
            <p className="font-bold text-2xl ml-2 mt-3 text-[#15EEED]">Fish</p>
            <p className="font-bold text-2xl  mt-3 text-white">Forecast</p>
          </div>

          <div id="searchBar" className="w-100 h-12 rounded-2xl bg-[#0C1C2B] my-auto ml-125 flex flex-row">
            <Search className="w-6 h-6 text-[#8A96A3] mt-3 ml-5" />
            <textarea placeholder="Search locations..." className="resize-none focus:outline-none my-3 ml-3 text-[#8A96A3] w-90 text-gray-400"></textarea>
          </div>

          <Bell className="w-8 h-8 text-[#838D97] mt-6 ml-15"/>

          <div className="w-60 h-20 ml-12 flex flex-row mt-1">
            <CircleUserRound className="text-white w-12 h-12 mt-3"/>
            <div className="flex flex-col mt-4 ml-2">
              <p className="font-bold text-lg">Dylan Doe</p>
              <p className="text-xs text-orange-400">Premium</p>
            </div>
            <button className="w-8 h-8  ml-3 mt-5" onClick={() => userModalOpen(!userModal)}>
              <ChevronDown className="w-6 h-6 hover:text-gray-400"/>
            </button>
          </div>

          
        </header>
        
        <div className="flex flex-1 flex-row">

          <div className="h-screen w-55 bg-[#051420] flex flex-col gap-6 pl-3 border-r-[1.5px] border-[#162A39]">

            <Link href="/" className="group flex flex-row gap-3 mt-5 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out">
              <LayoutGrid fill="#838D97"  className="text-[#838D97] group-hover:text-[#15EEED] group-hover:fill-[#15EEED] transition-colors duration-200"/>
              <span className=" text-[#838D97] group-hover:text-white transition-colors duration-200">Dashboard</span>
            </Link>
            <Link href="/" className="group flex flex-row gap-3 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out">
              <Map  className="text-[#838D97] group-hover:text-[#15EEED] transition-colors duration-200"/>
              <span className="text-[#838D97] group-hover:text-white transition-colors duration-200">Map</span>
            </Link>
            <Link href="/" className="group flex flex-row gap-3 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out">
              <Bot  className="text-[#838D97] group-hover:text-[#15EEED] transition-colors duration-200"/>
              <span className="text-[#838D97] group-hover:text-white transition-colors duration-200">AI Coach</span>
            </Link>
            <Link href="/" className="group flex flex-row gap-3 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out">
              <Users className="text-[#838D97] group-hover:text-[#15EEED] transition-colors duration-200"/>
              <span className=" text-[#838D97] group-hover:text-white transition-colors duration-200">Community</span>
            </Link>
            <Link href="/" className="group flex flex-row gap-3 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out">
              <MessageCircle className="text-[#838D97] group-hover:text-[#15EEED] transition-colors duration-200"/>
              <span className=" text-[#838D97] group-hover:text-white transition-colors duration-200">Messages</span>
            </Link>
            
          </div>

          {children}
        </div>


        {userModal && 
        <div className="w-50 h-60 bg-[#051420] absolute right-5 top-20 rounded-b-lg">
          <div className="ml-15 flex flex-col gap-3 mt-3">
            <p className="font-bold text-white text-lg">Settings</p>
            <p className="font-bold text-white text-lg">FAQ</p>
            <p className="font-bold text-white text-lg">About</p>
            <p className="font-bold text-orange-400 text-lg">Upgrade</p>
            <p className="font-bold text-red-500 text-lg">Sign Out</p>
          </div>
        </div>}
        
      </body>
    </html>
  );
}
