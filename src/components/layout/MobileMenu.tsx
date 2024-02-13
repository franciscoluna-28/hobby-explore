"use client";

import { usePathname } from "next/navigation";
import { MdExplore } from "react-icons/md";
import { MdOutlineExplore } from "react-icons/md";
import Link from "next/link";
import { FaBookmark } from "react-icons/fa6";
import { Bookmark } from "lucide-react";
import { UserRound } from "lucide-react";

// TODO: REFACTOR CODE BY CREATING A SPECIFIC COMPONENT TO DEAL WITH RENDERING THE LINKS
export function MobileMenu() {
  const pathName = usePathname();
  return (
    <nav className="bg-white border-t shadow-sm h-16 w-full fixed bottom-0 mt-8 md:hidden z-[100]">
      <div className="flex items-center justify-center h-full p-4 m-auto justify-around">
        <Link href="/app/explore">
          {pathName === "/app/explore" ? (
            <MdExplore className="w-8 h-8 text-mainGreen" />
          ) : (
            <MdOutlineExplore className="w-8 h-8" />
          )}
        </Link>
        <Link href="/app/saved">
          {pathName === "/app/saved" ? (
            <FaBookmark className="w-8 h-8 text-mainGreen" />
          ) : (
            <Bookmark className="w-8 h-8 text-gray" />
          )}
        </Link>
        <Link href="/app/my-profile">
          {pathName === "/app/my-profile" ? (
            <UserRound className="w-8 h-8 text-mainGreen" />
          ) : (
            <UserRound className="w-8 h-8 text-gray" />
          )}
        </Link>
      </div>
    </nav>
  );
}
