"use client";

import { usePathname } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";
import Link from "next/link";
import {
  CircleUserRound,
  Fish,
  ChevronRight,
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

export default function AppLayout({ children }: { children: ReactNode }) {
  const [userModal, userModalOpen] = useState(false);
  const { openUserProfile } = useClerk();
  const [user, setUser] = useState<any>(null);
  const pathname = usePathname();

  useEffect(() => {
    const getUser = async () => {
      const res = await fetch("/api/getUser");
      const data = await res.json();

      setUser(data);
    };

    getUser();
  }, []);

  return (
    <div className="flex flex-col h-dvh overflow-hidden bg-[#051420]">
      {/* HEADER */}
      <header className="w-full h-20 shrink-0 bg-[#051420] flex items-center border-b-[1.5px] border-[#162A39] px-4">
        {/* LEFT */}
        <div className="flex items-center gap-2 shrink-0">
          <Fish className="w-7 h-7 text-[#15EEED]" />

          <div className="flex flex-row gap-px">
            <p className="font-bold lg:text-2xl sm:text-2xl text-[0px] text-[#15EEED]">
              Fish
            </p>

            <p className="font-bold lg:text-2xl sm:text-2xl text-[0px] text-white">
              Forecast
            </p>
          </div>
        </div>

        {/* CENTER */}
        <div className="flex-1 flex justify-center px-4">
          <div className="w-full max-w-100 min-w-10">
            <SearchBar />
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center lg:gap-4 gap-5 shrink-0">
          <Bell className="w-7 h-7 text-[#838D97] transition duration-200 hover:text-white cursor-pointer" />

          <div
            className="flex group items-center lg:gap-2 gap-px px-2 py-1 rounded-lg hover:bg-[#0C1F2D] transition duration-300 cursor-pointer"
            onClick={() => userModalOpen(!userModal)}
          >
            <CircleUserRound className="text-white w-10 h-10" />

            <div className="flex flex-col leading-tight">
              {user && (
                <p className="select-none font-bold lg:text-sm sm:text-sm text-[0px] whitespace-nowrap">
                  {user.name}
                </p>
              )}

              {user?.is_premium == 1 && (
                <p className="lg:text-xs sm:text-xs text-[0px] text-orange-400 select-none">
                  Premium
                </p>
              )}

              {user?.is_premium == 0 && (
                <p className="lg:text-xs sm:text-xs text-[0px] text-gray-300 select-none">
                  Free
                </p>
              )}
            </div>

            <ChevronRight
              className={`w-5 h-5 text-gray-400 group-hover:text-white transition-all ${
                userModal ? "rotate-90" : "rotate-0"
              }`}
            />
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 flex-row overflow-hidden min-h-0">
        {/* SIDEBAR */}
        <div className="h-full lg:w-55 sm:w-55 w-0 bg-[#051420] flex flex-col gap-6 lg:pl-3 sm:pl-3 pl-0 lg:border-r-[1.5px] sm:border-r-[1.5px] border-r-0 border-[#162A39] overflow-hidden shrink-0">
          {/* Dashboard */}
          <Link
            href="/dashboard"
            scroll={false}
            className={`group flex flex-row gap-3 mt-5 w-40 h-12 items-center pl-4 rounded-lg transition-all duration-200 ease-out ${
              pathname === "/dashboard" ? "bg-[#053543]" : "hover:bg-[#053543]"
            }`}
          >
            <LayoutGrid
              fill="#838D97"
              className={`transition-colors duration-200 ${
                pathname === "/dashboard"
                  ? "text-[#15EEED] fill-[#15EEED]"
                  : "text-[#838D97] group-hover:text-[#15EEED] group-hover:fill-[#15EEED]"
              }`}
            />

            <span
              className={`transition-colors duration-200 ${
                pathname === "/dashboard"
                  ? "text-white"
                  : "text-[#838D97] group-hover:text-white"
              }`}
            >
              Dashboard
            </span>
          </Link>

          {/* Map */}
          <Link
            href="/map"
            scroll={false}
            className={`group flex flex-row gap-3 w-40 h-12 items-center pl-4 rounded-lg transition-all duration-200 ease-out ${
              pathname === "/map" ? "bg-[#053543]" : "hover:bg-[#053543]"
            }`}
          >
            <Map
              className={`transition-colors duration-200 ${
                pathname === "/map"
                  ? "text-[#15EEED]"
                  : "text-[#838D97] group-hover:text-[#15EEED]"
              }`}
            />

            <span
              className={`transition-colors duration-200 ${
                pathname === "/map"
                  ? "text-white"
                  : "text-[#838D97] group-hover:text-white"
              }`}
            >
              Map
            </span>
          </Link>

          {/* AI Coach */}
          <Link
            href="/ai-coach"
            scroll={false}
            className={`group flex flex-row gap-3 w-40 h-12 items-center pl-4 rounded-lg transition-all duration-200 ease-out ${
              pathname === "/ai-coach" ? "bg-[#053543]" : "hover:bg-[#053543]"
            }`}
          >
            <Bot
              className={`transition-colors duration-200 ${
                pathname === "/ai-coach"
                  ? "text-[#15EEED]"
                  : "text-[#838D97] group-hover:text-[#15EEED]"
              }`}
            />

            <span
              className={`transition-colors duration-200 ${
                pathname === "/ai-coach"
                  ? "text-white"
                  : "text-[#838D97] group-hover:text-white"
              }`}
            >
              AI Coach
            </span>
          </Link>

          {/* Community */}
          <Link
            href="/community"
            scroll={false}
            className={`group flex flex-row gap-3 w-40 h-12 items-center pl-4 rounded-lg transition-all duration-200 ease-out ${
              pathname === "/community" ? "bg-[#053543]" : "hover:bg-[#053543]"
            }`}
          >
            <Users
              className={`transition-colors duration-200 ${
                pathname === "/community"
                  ? "text-[#15EEED]"
                  : "text-[#838D97] group-hover:text-[#15EEED]"
              }`}
            />

            <span
              className={`transition-colors duration-200 ${
                pathname === "/community"
                  ? "text-white"
                  : "text-[#838D97] group-hover:text-white"
              }`}
            >
              Community
            </span>
          </Link>

          {/* Messages */}
          <Link
            href="/messages"
            scroll={false}
            className={`group flex flex-row gap-3 w-40 h-12 items-center pl-4 rounded-lg transition-all duration-200 ease-out ${
              pathname === "/messages" ? "bg-[#053543]" : "hover:bg-[#053543]"
            }`}
          >
            <MessageCircle
              className={`transition-colors duration-200 ${
                pathname === "/messages"
                  ? "text-[#15EEED]"
                  : "text-[#838D97] group-hover:text-[#15EEED]"
              }`}
            />

            <span
              className={`transition-colors duration-200 ${
                pathname === "/messages"
                  ? "text-white"
                  : "text-[#838D97] group-hover:text-white"
              }`}
            >
              Messages
            </span>
          </Link>
        </div>

        {/* PAGE CONTENT */}
        <div className="flex-1 overflow-hidden relative min-h-0">
          {children}
        </div>

        {/* MOBILE NAV */}
        <div className="fixed bottom-0 left-0 right-0 h-[calc(4rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] bg-[#051420] border-t border-[#162A39] flex sm:hidden z-50">
          {[
            {
              href: "/dashboard",
              icon: LayoutGrid,
              label: "Dashboard",
            },
            {
              href: "/map",
              icon: Map,
              label: "Map",
            },
            {
              href: "/ai-coach",
              icon: Bot,
              label: "AI",
            },
            {
              href: "/community",
              icon: Users,
              label: "Community",
            },
            {
              href: "/messages",
              icon: MessageCircle,
              label: "Messages",
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <Link
                key={index}
                href={item.href}
                scroll={false}
                className={`group flex-1 flex flex-col items-center justify-center gap-1 transition-all ${
                  pathname === item.href ? "bg-[#053543]" : "hover:bg-[#053543]"
                }`}
              >
                <Icon
                  className={`w-5 h-5 transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-[#15EEED]"
                      : "text-[#838D97] group-hover:text-[#15EEED]"
                  }`}
                />

                <span
                  className={`text-[11px] transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-white"
                      : "text-[#838D97] group-hover:text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* USER MODAL */}
      {userModal && (
        <div className="w-64 bg-[#102738] absolute right-0 top-20 rounded-xl border border-[#162A39] shadow-2xl overflow-hidden z-50">
          <div className="p-4 border-b border-[#162A39] bg-[#0C1F2D]/50">
            <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
              Account
            </p>
          </div>

          <div className="p-2 flex flex-col gap-1">
            <button
              onClick={() => openUserProfile()}
              className="flex items-center gap-3 w-full px-3 py-2 text-gray-300 hover:text-white hover:bg-[#162A39] rounded-lg transition-all group"
            >
              <Settings className="w-5 h-5 text-[#15EEED] group-hover:rotate-45 transition-transform" />

              <span className="text-sm font-medium">Manage Account</span>
            </button>

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
