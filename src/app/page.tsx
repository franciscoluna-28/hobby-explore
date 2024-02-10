"use client";

import "./globals.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database";
import { LoginWithGoogle } from "@/components/auth/LoginWithGoogle";
import { Toaster } from "sonner";

// Note: The 'use client' directive is needed for Google Authentication
const supabase = createClientComponentClient<Database>();

export default function Home() {
  return (
    <>
      <Toaster />
      <main className="flex relative w-full min-h-screen flex-col items-center justify-between">
        {/*  <h1 className="text-5xl px-16 font-extrabold leading-tight text-center text-mainBlack">
          Share Your Unique Hobbies
        </h1>
        <p className="text-center text-mainBlack text-lg py-2">
          Tell us about the tips and how do them
        </p>
 */}
        <div className="space-y-6 flex flex-col !min-w-full items-center p-8">
          <p className="text-slate-500 text-sm">Hey! I&apos;m really sorry for this WIP screen. I&apos;ll be working on the landing page soon. For now, feel free to use your google account. :)</p>
          <LoginWithGoogle supabase={supabase} />
        </div>
      </main>
    </>
  );
}
