"use client";

import { LoginWithGoogle } from "@/components/auth/LoginWithGoogle";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Register() {
  const supabase = createClientComponentClient();

  return <LoginWithGoogle supabase={supabase} />;
}
