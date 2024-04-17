"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Bookmark } from "lucide-react";
import { UserRound } from "lucide-react";
import { Home } from "lucide-react";

export function MobileMenu() {
  const pathName = usePathname();
  return (
    <nav className="bg-white border-t shadow-sm h-16 w-full fixed bottom-0 mt-8 md:hidden z-[100] dark:bg-[#1e1e1e]">
      <div className="flex items-center justify-center h-full p-4 m-auto justify-around">
        <Link href="/app/explore">
         <Home className={`${pathName === "/app/explore" ? "text-[#1E1E1E] dark:text-white" : "text-[#7E7E7E]"}`}

         />
        </Link>
        <Link href="/app/saved/activities">
        <Bookmark 
            className={`${pathName === "/app/saved/activities" ? "text-[#1E1E1E] dark:text-white" : "text-[#7E7E7E]"}`}
         />
        </Link>
        <Link href="/app/my-profile">
        <UserRound 
className={`${pathName === "/app/my-profile" ? "text-[#1E1E1E] dark:text-white" : "text-[#7E7E7E]"}`}
         />
        </Link>
      </div>
    </nav>
  );
}
