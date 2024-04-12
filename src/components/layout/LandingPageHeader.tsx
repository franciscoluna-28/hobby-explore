"use client";

import { useTheme } from "next-themes";
import ThemeSwitch from "@/components/ui/theme-switcher";
import Image from "next/image";
import LightModeLogo from "../../../public/Logo-Dark.svg";
import DarkModeLogo from "../../../public/Logo (Web).svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function LandingPageHeader() {
  const { theme } = useTheme();

  return (
    <header className="w-full  h-20 sticky top-0 z-[9999] bg-white border-b dark:bg-[#171717] lg:flex justify-center hidden duration-200 transition-all">
      <div className="max-w-[1100px] w-full flex px-8">
        <div className="flex items-center aspect-video">
          <Image
            src={theme !== "light" ? DarkModeLogo : LightModeLogo}
            alt="Hobby DarkModeLogo"
            className={theme !== "light" ? "h-32 w-auto" : "h-32 w-auto "}
          />
        </div>
        <div className="flex flex-row items-center w-full max-w-[1000px]">
          <ul className="flex gap-8 m-auto">
            <li>
              <Link
                className="text-sm text-mainBlack/80 dark:text-white link"
                href="#"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-mainBlack/80 dark:text-white link"
                href="#"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-mainBlack/80 dark:text-white link"
                href="#"
              >
                Benefits
              </Link>
            </li>
            <li>
              <Link
                className="text-sm text-mainBlack/80 dark:text-white link"
                href="#"
              >
                FAQ
              </Link>
            </li>
          </ul>
        </div>
        <ul className="gap-8 flex items-center">
          <li>
            <Button asChild variant="ghost">
              <Link className="text-sm w-full font-medium" href="/auth/login">
                Login
              </Link>
            </Button>
          </li>
          <Button asChild>
            <Link className="" href="/auth/register">
              Sign Up
            </Link>
          </Button>
          <li>
            <ThemeSwitch shouldBeCard={false} />
          </li>
        </ul>
      </div>
    </header>
  );
}
