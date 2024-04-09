"use server"

import { Database } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });

export async function checkIfUsernameIsAvailableInDatabaseAction(
  username: string
): Promise<boolean> {
 
    console.log(username)
 
    try {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("username", username);

      console.log(data);

    if (error) {
      console.error("Error fetching data:", error);
      return false;
    }

    // If we don't find any users with the username we assume it's available
    return data.length === 0;
  } catch (error) {
    console.error("Error fetching data:", error);
    return false;
  }
}
