"use server";

import { Database, Tables } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

type ActionResponse = {
  success?: boolean;
  message?: string;
  error?: PostgrestError;
};

// File used exclusively created for user CRUD operations
const supabase = createServerComponentClient<Database>({ cookies });

export async function updateUserDescription(
  description: string,
  userId: Tables<"users">["user_id"]
) {
  const { error } = await supabase
    .from("users")
    .update({ description: description })
    .match({ user_id: userId });

  if (error) {
    return {
      ...error,
      success: false,
    };
  }

  revalidatePath("/app/my-profile");

  return {
    success: true,
    message: "User description updated successfully",
  };
}

export async function updateUserUsername(username: string, userId: string) {
  const { error } = await supabase
    .from("users")
    .update({ username })
    .match({ user_id: userId });

  if (error) {
    return {
      ...error,
      success: false,
    };
  }

  revalidatePath("/app/my-profile");

  return {
    success: true,
    message: "Username updated successfully",
  };
}

export async function updateDisplayName(displayName: string, userId: string) {
  const { error } = await supabase
    .from("users")
    .update({ displayName })
    .match({ user_id: userId });

  console.log(error);

  if (error) {
    return {
      ...error,
      success: false,
    };
  }

  return {
    success: true,
    message: "Display name updated successfully",
  };
}

export async function updateUserLocation(
  location: Tables<"users">["location"],
  userId: Tables<"users">["user_id"]
) {
  const { error } = await supabase
    .from("users")
    .update({
      location,
    })
    .match({
      user_id: userId,
    });

  if (error) {
    return {
      ...error,
      success: false,
    };
  }

  // This is the equivalent of setting a new global state
  revalidatePath("/app/my-profile");

  return {
    success: true,
    message: "Location updated successfully!",
  };
}
