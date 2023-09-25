import { isUserAuthenticated } from "../auth/is-user-authenticated";
import { SupabaseClient } from "@supabase/supabase-js";

/**
 * Upload an activity to Supabase.
 *
 * @param {SupabaseClient} supabase - The Supabase client.
 * @param {object} activityData - The activity data to upload.
 * @param {string} user_uuid - The user's UUID.
 * @returns {Promise<object>} - A promise that resolves to the result of the activity upload.
 */
async function uploadActivityToSupabase(
  supabase: SupabaseClient,
  activityData: any,
  user_uuid: string
) {
  const isAuthenticated = await isUserAuthenticated(supabase);

  if (!isAuthenticated) {
    return {
      success: false,
      error: "Not authorized",
      status: 401,
    };
  }

  try {
    const { data: activityResult, error: activityError } = await supabase
      .from("activities")
      .upsert([{ ...activityData, user_uuid }])
      .select("id");

    if (activityError) {
      return {
        success: false,
        error: activityError.message,
        status: 500,
      };
    }

    const activity_id = activityResult[0].id;

    return {
      success: true,
      activity_id,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        success: false,
        error: error.message,
        status: 500,
      };
    }
  }
}

export { uploadActivityToSupabase };
