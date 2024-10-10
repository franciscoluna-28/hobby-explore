"use client";

import { Logo } from "./Logo";
import { HeaderLinksContainer } from "./HeaderLinksContainer";
import ThemeSwitch from "../ui/theme-switcher";
import { UserAvatar } from "../profile/UserAvatar";
import { UserDropdownMenu } from "../profile/UserDropdownMenu";
import { useGetCurrentUser } from "@/hooks/user/useGetCurrentUser";

export function Header() {
  const { data } = useGetCurrentUser();
  return (
    <header className="bg-mainGreen relative w-full py-2.5 md:block hidden dark:bg-[#171717] border-b transition-all duration-200">
      <div className="w-full flex justify-between items-center max-w-[1200px] px-12 m-auto">
        <Logo />
        <HeaderLinksContainer />
        <div className="flex gap-4 items-center">
          <UserDropdownMenu>
            <UserAvatar profilePictureUrl={data?.profile_picture_url} />
          </UserDropdownMenu>
          <ThemeSwitch shouldBeCard={false} />
        </div>
      </div>
    </header>
  );
}
