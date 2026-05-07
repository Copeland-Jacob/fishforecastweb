"use client";

import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import {
  CircleUserRound,
  Fish,
  ChevronDown,
  Search,
  LayoutGrid,
  Map,
  Bot,
  Users,
  MessageCircle,
  Bell,
  Settings,
  LogOut,
  Crown,
} from "lucide-react";
import SearchBar from "@/components/SearchBar";
import { SignOutButton, useClerk } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs";

export default function AppLayout({ children }: { children: ReactNode }) {
  const [userModal, userModalOpen] = useState(false);
  const { openUserProfile } = useClerk();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/getUser");

      const data = await res.json();

      setUser(data);
    };
    getUser();
  }, []);

  return (
    <div>
      <header className="w-full h-20 bg-[#051420] flex items-center border-b-[1.5px] border-[#162A39] px-4">
        {/* LEFT - Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Fish className="w-7 h-7 text-[#15EEED]" />
          <p className="font-bold text-2xl text-[#15EEED]">Fish</p>
          <p className="font-bold text-2xl text-white">Forecast</p>
        </div>

        {/* CENTER - Search (takes all available space) */}
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-md">
            <SearchBar />
          </div>
        </div>

        {/* RIGHT - Actions */}
        <div className="flex items-center gap-4 shrink-0">
          <Bell className="w-7 h-7 text-[#838D97] hover:text-white cursor-pointer" />

          {/* User block */}
          <div className="flex items-center gap-2 px-2 py-1 rounded-lg hover:bg-[#0C1F2D] transition">
            <CircleUserRound className="text-white w-10 h-10" />

            <div className="flex flex-col leading-tight">
              {user && (
                <p className="font-bold text-sm whitespace-nowrap">
                  {user.name}
                </p>
              )}
              <p className="text-xs text-orange-400">Premium</p>
            </div>

            <button onClick={() => userModalOpen(!userModal)}>
              <ChevronDown className="w-5 h-5 text-gray-400 hover:text-white" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 flex-row">
        <div className="h-screen w-55 bg-[#051420] flex flex-col gap-6 pl-3 border-r-[1.5px] border-[#162A39]">
          <Link
            href="/"
            className="group flex flex-row gap-3 mt-5 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out"
          >
            <LayoutGrid
              fill="#838D97"
              className="text-[#838D97] group-hover:text-[#15EEED] group-hover:fill-[#15EEED] transition-colors duration-200"
            />
            <span className=" text-[#838D97] group-hover:text-white transition-colors duration-200">
              Dashboard
            </span>
          </Link>
          <Link
            href="/"
            className="group flex flex-row gap-3 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out"
          >
            <Map className="text-[#838D97] group-hover:text-[#15EEED] transition-colors duration-200" />
            <span className="text-[#838D97] group-hover:text-white transition-colors duration-200">
              Map
            </span>
          </Link>
          <Link
            href="/"
            className="group flex flex-row gap-3 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out"
          >
            <Bot className="text-[#838D97] group-hover:text-[#15EEED] transition-colors duration-200" />
            <span className="text-[#838D97] group-hover:text-white transition-colors duration-200">
              AI Coach
            </span>
          </Link>
          <Link
            href="/"
            className="group flex flex-row gap-3 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out"
          >
            <Users className="text-[#838D97] group-hover:text-[#15EEED] transition-colors duration-200" />
            <span className=" text-[#838D97] group-hover:text-white transition-colors duration-200">
              Community
            </span>
          </Link>
          <Link
            href="/"
            className="group flex flex-row gap-3 w-40 h-12 items-center pl-4 hover:bg-[#053543] rounded-lg transition-all duration-200 ease-out"
          >
            <MessageCircle className="text-[#838D97] group-hover:text-[#15EEED] transition-colors duration-200" />
            <span className=" text-[#838D97] group-hover:text-white transition-colors duration-200">
              Messages
            </span>
          </Link>
        </div>

        {children}
      </div>

      {userModal && (
        <div className="w-64 bg-[#102738] absolute right-0 top-20 rounded-xl border border-[#162A39] shadow-2xl overflow-hidden z-50">
          {/* Header Section */}
          <div className="p-4 border-b border-[#162A39] bg-[#0C1F2D]/50">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Account
            </p>
          </div>

          <div className="p-2 flex flex-col gap-1">
            {/* Manage Account Button */}
            <button
              onClick={() => openUserProfile()}
              className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-[#162A39] rounded-lg transition-all group"
            >
              <Settings className="w-5 h-5 text-[#15EEED] group-hover:rotate-45 transition-transform" />
              <span className="text-sm font-medium">Manage Account</span>
            </button>

            {/* Upgrade Button - Highlighted */}
            <button className="flex items-center gap-3 w-full px-3 py-2 text-orange-400 hover:bg-orange-400/10 rounded-lg transition-all group">
              <Crown className="w-5 h-5 fill-orange-400" />
              <span className="text-sm font-bold">Upgrade to Pro</span>
            </button>
          </div>

          <div className="p-2 border-t border-[#162A39] flex flex-col gap-1">
            <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-gray-500">
              Support
            </p>

            <button className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-[#162A39] rounded-lg transition-all">
              <span className="text-sm">About & Legal</span>
            </button>

            {/* Sign Out - Integrated into the list style */}
            <SignOutButton>
              <button className="flex items-center gap-3 w-full px-3 py-2 mt-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                <LogOut className="w-5 h-5" />
                <span className="text-sm font-bold">Sign Out</span>
              </button>
            </SignOutButton>
          </div>
        </div>
      )}
    </div>
  );
}
