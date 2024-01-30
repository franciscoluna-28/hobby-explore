"use client";

import "./globals.css";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/lib/database";
import { LoginWithGoogle } from "@/components/auth/LoginWithGoogle";

// Note: The 'use client' directive is needed for Google Authentication
const supabase = createClientComponentClient<Database>();

export default function Home() {
  return (
    <main className="flex relative bg-[url('/bg.svg')] bg-no-repeat w-full min-h-screen flex-col items-center justify-between">
      {/*  <h1 className="text-5xl px-16 font-extrabold leading-tight text-center text-mainBlack">
          Share Your Unique Hobbies
        </h1>
        <p className="text-center text-mainBlack text-lg py-2">
          Tell us about the tips and how do them
        </p>
 */}
      <div className="space-y-6 flex flex-col !min-w-full items-center p-8">
        <LoginWithGoogle supabase={supabase} />
      </div>
    </main>
  );
}
