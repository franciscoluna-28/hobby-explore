"use client";

import { Logo } from "./Logo";
import Link from "next/link";
import { HeaderLinksContainer } from "./HeaderLinksContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  profilePictureUrl: string | null | undefined
}

export function Header({profilePictureUrl}: Props) {
  return (
    <header className="bg-mainGreen relative w-full justify-around px-4 py-2.5 md:flex items-center hidden ">
      <Logo />
      <HeaderLinksContainer />

      <Link href="/app/profile">
        <Avatar>
          <AvatarImage src={getSupabaseFileUrlFromRelativePath(profilePictureUrl ?? "", "avatars")} />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
