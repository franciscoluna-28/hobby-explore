"use client";

import { LinkElement } from "@/components/layout/LinkElement";
import Image from "next/image";
import { BsCompassFill } from "react-icons/bs";
import { IoMdNotifications } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BsBookmarkFill } from "react-icons/bs";
import { usePathname } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  // Call the current path
  const pathname = usePathname();

  const isHomePage = pathname === "/home";
  const isSavedActivities = pathname === "/home/saved-activities";

  return (
    <>
      <header className="bg-mainGreen flex h-16 items-center m-auto px-4 shadow-md">
        <Image
          src="/logo-web-white.svg"
          alt="Hobby Explore Logo"
          width={150}
          height={150}
        />

        <div className="justify-center m-auto h-full flex gap-8 ">
          <LinkElement href="/home" title="Explore" isActive={isHomePage}>
            <BsCompassFill />
          </LinkElement>
          <LinkElement
            title="Shortlist"
            href="/home/saved-activities"
            isActive={isSavedActivities}
          >
            <BsBookmarkFill />
          </LinkElement>
        </div>
        <div className="flex justify-end items-center gap-4">
          <IoMdNotifications className="text-white text-2xl" />
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
      </header>

      <main className="p-8 mx-16">{children}</main>
    </>
  );
}
