"use client";

import { Button } from "@/components/ui/button";
import { SupabaseClient } from "@supabase/supabase-js";
import { Database } from "@/lib/database";
import { useTheme } from "next-themes";

type Props = {
  supabase: SupabaseClient<Database>;
};

export function LoginWithGoogle({ supabase }: Props) {
  const { theme } = useTheme();

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
    <Button
      type="button"
      onClick={loginWithGoogle}
      variant="outline"
      className="w-full gap-2"
    >
      Continue with Google{" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-brand-google"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke={theme === "light" ? "#1e1e1e" : "#ffffff"}
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M20.945 11a9 9 0 1 1 -3.284 -5.997l-2.655 2.392a5.5 5.5 0 1 0 2.119 6.605h-4.125v-3h7.945z" />
      </svg>
    </Button>
  );
}
