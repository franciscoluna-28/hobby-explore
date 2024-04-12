"use client";

import { useTheme } from "next-themes";
import ThemeSwitch from "@/components/ui/theme-switcher";
import Image from "next/image";
import LightModeLogo from "../../../public/Logo-Dark.svg";
import DarkModeLogo from "../../../public/Logo (Web).svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Home, Menu } from "lucide-react";
import { UserRound } from "lucide-react";
import { useOutsideClick } from "@/hooks/useClickOutside";
import { Tables } from "@/lib/database";
import { UserDropdownMenu } from "../profile/UserDropdownMenu";
import { UserAvatar } from "../profile/UserAvatar";

type MobileLinkProps = {
  children: React.ReactNode;
  href: string;
};

type LandingPageHeaderProps = {
  user?: Tables<"users"> | null;
};

export default function LandingPageHeader({ user }: LandingPageHeaderProps) {
  function MobileLink({ href, children }: MobileLinkProps) {
    return (
      <Link
        className="flex gap-4 text-sm py-3.5 px-4 rounded-lg text-mainGray items-center hover:bg-slate-100 duration-200"
        onClick={handleOpen}
        href={href}
      >
        {children}
      </Link>
    );
  }

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useOutsideClick(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  });

  const handleOpen = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const { theme } = useTheme();

  return (
    <header
      ref={ref}
      className="w-full flex h-20 sticky top-0 z-[9999] bg-white border-b dark:bg-[#171717] lg:flex justify-center  duration-200 transition-all"
    >
      <div className="flex items-center justify-between w-full px-8 lg:hidden">
        <Image
          src={theme !== "light" ? DarkModeLogo : LightModeLogo}
          alt="Hobby DarkModeLogo"
          className={
            theme !== "light" ? "h-6 lg:h-32 w-auto" : "h-6 lg:h-32 w-auto "
          }
        />
        <Button onClick={handleOpen}>
          <Menu />
        </Button>
      </div>
      <AnimatePresence>
        {isOpen ? (
          <motion.aside
            initial={{ translateX: "-100vw" }}
            animate={{ translateX: 0 }}
            exit={{ translateX: "-100vw" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed top-0 left-0 w-1/2 min-w-[200px] bg-white border-r shadow-md z-30 h-screen"
          >
            <div className="px-6">
              <ul className="grid">
                <li className="hover:bg-mainGray/10 py-4 px-4 duration-200 rounded-lg">
                  <MobileLink href="/">
                    <Home className="w-4 h-4" /> Home
                  </MobileLink>
                </li>

                <li className="hover:bg-mainGray/10 py-4 px-4 duration-200 rounded-lg">
                  <MobileLink href="/auth/login">
                    <UserRound className="w-4 h-4" /> Login
                  </MobileLink>
                </li>
                <li className="hover:bg-mainGray/10 py-4 px-4 duration-200 rounded-lg">
                  <Button className="w-full" asChild>
                    <Link href="/auth/register">Register</Link>
                  </Button>
                </li>
              </ul>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
      <div className="max-w-[1100px] w-full lg:flex px-8 hidden">
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
        {user ? (
          <ul className="gap-8 flex items-center">
            <li>
              <Button asChild>
                <Link
                  className="text-sm w-full font-medium"
                  href="/app/explore"
                >
                  Go to app
                </Link>
              </Button>
            </li>
              <UserAvatar profilePictureUrl={user?.profile_picture_url} shouldHaveLink />
            <li>
              <ThemeSwitch shouldBeCard={false} />
            </li>
          </ul>
        ) : (
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
        )}
      </div>
    </header>
  );
}
