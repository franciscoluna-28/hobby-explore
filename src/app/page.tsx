"use client";

import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { Database } from "@/lib/database";

// Note: Use client is directive is needed for Google Authentication
const supabase = createClientComponentClient<Database>();

const loginWithGoogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      console.error("Google login error:", error);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
};

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <Button onClick={loginWithGoogle}>Login with Google</Button>
    </main>
  );
}
