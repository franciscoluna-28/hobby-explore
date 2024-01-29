"use client";

import "./globals.css";
import { EyeIcon, EyeOffIcon, MailIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/lib/database";
import { LoginWithGoogle } from "@/components/auth/LoginWithGoogle";
import { Input } from "@nextui-org/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Card from "../../public/card.png";

// Note: The 'use client' directive is needed for Google Authentication
const supabase = createClientComponentClient<Database>();

export default function Home() {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <main className="flex relative bg-[url('/bg.svg')] bg-no-repeat w-full min-h-screen flex-col items-center justify-between">
      <section className="w-full flex">
        <div className="w-1/2">
          <Image src={Card} width={1000} height={1000} alt="Card"></Image>
        </div>

        <h1 className="text-5xl px-16 font-extrabold leading-tight text-center text-mainBlack">
          Share Your Unique Hobbies
        </h1>
        <p className="text-center text-mainBlack text-lg py-2">
          Tell us about the tips and how do them
        </p>

        <div className="space-y-6 flex flex-col !min-w-full items-center">
          <LoginWithGoogle supabase={supabase} />
        </div>
      </section>
    </main>
  );
}
