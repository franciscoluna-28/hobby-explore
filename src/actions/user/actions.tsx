"use server"

import supabaseServer from "@/utils/supabase/server";

const supabase = supabaseServer()

export async function checkIfUsernameIsAvailableInDatabaseAction(
  username: string
): Promise<boolean> {
 
 
    try {
    const { data, error } = await supabase
      .from("users")
      .select("username")
      .eq("username", username);

  

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
