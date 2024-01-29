"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Tables } from "@/lib/database";

const supabase = createServerComponentClient<Database>({ cookies });

type User = Tables<"users">;

/**
 * Gets the current user from the database by getting the current session
 * @async
 * @function getCurrentUser
 * @returns {Promise<User|null|PostgrestError>} Returns the current user if found, null if no user is found, or an error if one occurs
 */
export async function getCurrentUser(): Promise<User | null> {
  const userId = (await supabase.auth.getSession()).data.session?.user.id ?? "";

  if (!userId) {
    return null;
  }

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .match({ user_id: userId })
    .single();

  if (!error && data) {
    return data;
  }

  return null;
}
