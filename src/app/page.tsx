"use client";

import "./globals.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { LoginWithGoogle } from "@/components/auth/LoginWithGoogle";
import { Toaster } from "sonner";
import DarkModeLogo from "../../public/Logo-Dark.svg";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Dog from "../../public/dog.png";
import Badge from "../../public/save-badge.svg";

// Note: The 'use client' directive is needed for Google Authentication
const supabase = createClientComponentClient<Database>();

export default function Home() {
  return (
    <>
      <Toaster />
      <header className="w-full h-20 bg-white border-b px-4 flex justify-center">
        <div className="flex items-center">
          <Image
            src={DarkModeLogo}
            alt="Hobby Explore"
            className="h-10 w-auto"
          />
        </div>
        <div className="flex flex-row items-center w-full max-w-[1000px]">
          <ul className="flex gap-8 m-auto">
            <li>
              <Link className="text-sm text-mainBlack" href="#">
                About
              </Link>
            </li>
            <li>
              <Link className="text-sm text-mainBlack" href="#">
                Features
              </Link>
            </li>
            <li>
              <Link className="text-sm text-mainBlack" href="#">
                Benefits
              </Link>
            </li>
            <li>
              <Link className="text-sm text-mainBlack" href="#">
                Testimonials
              </Link>
            </li>
          </ul>

          <ul className="gap-8 flex items-center">
           <li>
            <LoginWithGoogle supabase={supabase}/>
            </li>
            <Button asChild>
              <Link className="" href="#">
                Sign Up
              </Link>
            </Button>
          </ul>
        </div>
      </header>
      <main className="flex relative w-full min-h-screen flex-col items-center justify-between p-16">
        <section className="flex gap-8">
          <div className="max-w-[500px]">
            <h1 className="font-semibold text-6xl leading-relaxed">
              Find your New Hobbies Today
            </h1>
            <p className="text-mainBlack/80 text-[18px] mt-6">
              Discover exciting pastimes, connect with fellow enthusiasts, and
              grow personally. Welcome to Hobby Explore, your gateway to a
              vibrant world of hobbies and innovation.
            </p>
            <Button className="mt-6">Try it for free</Button>
          </div>
          <div>
            <div className="relative">
              <Image src={Dog} alt="Dog" className="w-96 h-96" />
              <Image src={Badge} alt="Badge" className="absolute w-32 h-32 z-40 right-0 bottom-0 translate-x-12 translate-y-16" />
            </div>
          </div>
        </section>
        {/* <div className="space-y-6 flex flex-col !min-w-full items-center p-8">
          <p className="text-slate-500 text-sm">
            Hey! I&apos;m really sorry for this WIP screen. I&apos;ll be working
            on the landing page soon. For now, feel free to use your google
            account. :)
          </p>
          <LoginWithGoogle supabase={supabase} />
        </div> */}
      </main>
    </>
  );
}
