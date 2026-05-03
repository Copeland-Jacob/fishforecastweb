"use client";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootPage() {
  const { userId, isLoaded } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded) {
      if (userId) {
        router.push("/dashboard");
      } else {
        router.push("/sign-in");
      }
    }
  }, [isLoaded, userId, router]);

  return <div className="bg-[#0C1F2D] h-screen w-screen" />; // Matches your app theme while loading
}
