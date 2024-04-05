"use client"

import { Button } from "@/components/ui/button";
import { OauthCard } from "./OauthCard";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database";
import Google from "../../../public/google.svg"

type Props = {
  supabase: SupabaseClient<Database>;
};

export function LoginWithGoogle({ supabase }: Props) {
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
  return (
    <Button onClick={loginWithGoogle} variant="outline" className="w-full">
    Continue with Google
  </Button>
  );
}
