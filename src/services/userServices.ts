"use server";

import { Database, Tables } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";

type ActionResponse = {
  success?: boolean;
  message?: string;
  error?: PostgrestError;
};

// File used exclusively created for user CRUD operations
const supabase = createServerComponentClient<Database>({ cookies });

export async function updateUserUsername(
  username: string,
  userId: Tables<"users">["user_id"]
): Promise<ActionResponse> {
  const { error } = await supabase
    .from("users")
    .update({ username: username })
    .match({ user_id: userId });

  if (error) {
    return error;
  }

  return {
    success: true,
    message: "Username updated successfully",
  };
}

export async function updateUserDescription(
  description: string,
  userId: Tables<"users">["description"]
) {
  const { error } = await supabase
    .from("users")
    .update({ description: description })
    .match({ user_id: userId });

  if (error) {
    return {
      ...error,
      success: false
    }
  }

  return {
    success: true,
    message: "User description updated successfully",
  };
}
