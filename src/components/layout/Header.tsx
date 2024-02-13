"use client";

import { Logo } from "./Logo";
import Link from "next/link";
import { HeaderLinksContainer } from "./HeaderLinksContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  profilePictureUrl: string | null | undefined;
};

// TODO: UPDATE PROFILE PICTURE WHEN UPDATED
export function Header({ profilePictureUrl }: Props) {
  return (
    <header className="bg-mainGreen relative w-full justify-around px-4 py-2.5 md:flex items-center hidden dark:bg-extraDarkBlack transition-all duration-200 dark:border-b dark:border-black ">
      <Logo />
      <HeaderLinksContainer />

      <Link href="/app/my-profile">
        <Avatar>
          <AvatarImage
            src={getSupabaseFileUrlFromRelativePath(
              profilePictureUrl ?? "",
              "avatars"
            )}
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
      </Link>
    </header>
  );
}
