import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Check if a user is authenticated.
 *
 * @param {SupabaseClient} supabase - The Supabase client.
 * @returns {boolean} - `true` if the user is authenticated, `false` otherwise.
 */
async function isUserAuthenticated(supabase: SupabaseClient): Promise<boolean> {
  const { data } = await supabase.auth.getSession();
  return !!data.session;
}

export { isUserAuthenticated }