"use client";

import { Logo } from "./Logo";
import Link from "next/link";
import { HeaderLinksContainer } from "./HeaderLinksContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import {
  Settings,
  User
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ThemeSwitch from "../ui/theme-switcher";

type Props = {
  profilePictureUrl: string | null | undefined;
};

export function Header({ profilePictureUrl }: Props) {
  return (
    <header className="bg-mainGreen relative w-full py-2.5 md:block hidden dark:bg-[#171717] border-b transition-all duration-200">
      <div className="w-full flex justify-between items-center max-w-[1200px] px-12 m-auto">
        <Logo />
        <HeaderLinksContainer />
        <div className="flex gap-4 items-center">
        <DropdownMenu>
          <DropdownMenuTrigger className="cursor-pointer" asChild>
            <Avatar>
           
          
              <AvatarImage
                src={
                  profilePictureUrl !== "" && profilePictureUrl
                    ? getSupabaseFileUrlFromRelativePath(
                        profilePictureUrl,
                        "avatars"
                      )
                    : "https://github.com/shadcn.png"
                }
                alt="User"
              />
              <AvatarFallback>User</AvatarFallback>
           
            </Avatar>
          
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/app/my-profile">
                <DropdownMenuItem className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
              <Link href="/app/my-profile/settings">
                <DropdownMenuItem className="cursor-pointer">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeSwitch shouldBeCard={false}/>
        </div>

        </div>
    
    </header>
  );
}
