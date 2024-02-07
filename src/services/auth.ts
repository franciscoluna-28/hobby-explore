"use server";

import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database, Tables } from "@/lib/database";
import { redirect } from "next/navigation";
import { AuthError } from "@supabase/supabase-js";

const supabase = createServerComponentClient<Database>({ cookies });

type ErrorResponse = {
  error: string;
  success: boolean;
} & Partial<AuthError>;

/**
 * Formats error response with the provided error message
 * @param {string} errorMessage - The error message to be included in the response
 * @returns {ErrorResponse} Formatted error response object
 */
function generateErrorMessage(errorMessage: string): ErrorResponse {
  return {
    error: errorMessage,
    success: false,
  };
}

type User = Tables<"users">;

/**
 * Gets the current user from the database by getting the current session
 * @async
 * @function getCurrentUser
 * @returns {Promise<User|null|PostgrestError>} Returns the current user if found, null if no user is found,
 *  or an error if one occurs
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

/**
 * Gets a user by its user id
 * @param userId - The user id to look for
 * @returns - Promise<User | null> - The user data or null if not found or error occurred
 */
// TODO: MAKE SURE TO HANDLE CASES WHERE THE USER DOESN'T EXIST
export async function getUserByUserId(userId: string) {
  console.log(userId)

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

// Default route to redirect the user to
const LANDING_PAGE_ROUTE = "/";

/**
 * Handles redirection for protected routes based on user authentication status.
 * If the user is not authenticated, or an error occurs while retrieving user data,
 * the function redirects the user to the landing page.
 * @async
 * @function handleProtectedRoute
 * @returns {Promise<void|null>} Returns void if the user is authenticated, or null
 *  if the user is not authenticated or an error occurs
 */
export async function handleProtectedRoute(): Promise<void | null> {
  const { data, error } = await supabase.auth.getUser();

  // Function to handle redirection to the landing page
  const handleRedirect = () => {
    redirect(LANDING_PAGE_ROUTE);
  };

  // If an error occurred while retrieving user data, or the user is not authenticated, redirect to the landing page
  if (error || !data.user) {
    handleRedirect();
  }
}

export async function getCurrentUserId(): Promise<string | undefined> {
  return (await supabase.auth.getUser()).data.user?.id;
}