"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { UserRound } from "lucide-react";
import { Home } from "lucide-react";

export function MobileMenu() {
  const pathName = usePathname();
  return (
    <nav className="bg-white border-t shadow-sm h-16 w-full fixed bottom-0 mt-8 md:hidden z-[100]">
      <div className="flex items-center justify-center h-full p-4 m-auto justify-around">
        <Link href="/app/explore">
         <Home 
            color={`${pathName === "/app/explore" ? "#1E1E1E" : "#7E7E7E"}`}
         />
        </Link>
        <Link href="/app/saved/activities">
        <Bookmark 
            color={`${pathName === "/app/saved/activities" ? "#1E1E1E" : "#7E7E7E"}`}
         />
        </Link>
        <Link href="/app/my-profile">
        <UserRound 
            color={`${pathName === "/app/my-profile" ? "#1E1E1E" : "#7E7E7E"}`}
         />
        </Link>
      </div>
    </nav>
  );
}
