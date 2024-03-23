"use client";

import { Logo } from "./Logo";
import Link from "next/link";
import { HeaderLinksContainer } from "./HeaderLinksContainer";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  profilePictureUrl: string | null | undefined;
};

export function Header({ profilePictureUrl }: Props) {
  return (
    <header className="bg-mainGreen relative w-full py-2.5 md:block hidden dark:bg-extraDarkBlack transition-all duration-200 dark:border-b dark:border-black ">
      <div className="w-full flex justify-between items-center max-w-[1200px] px-12 m-auto">
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
      </div>
    </header>
  );
}
