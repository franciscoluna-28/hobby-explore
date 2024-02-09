"use server";

import { Database, Tables } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { z } from "zod";
import { generateError, generateErrorResult } from "../errors/generateErrors";
import { SAVE_ACTIVITY_ERRORS_CONSTANTS } from "@/constants/errors/activities";
import { generateSuccessResult } from "../success/generateSuccess";
import { getCurrentUserId } from "../auth";
import { revalidatePath } from "next/cache";

const supabase = createServerComponentClient<Database>({ cookies });
/**
 * Returns a boolean indicating whether the activity exists in the database.
 * @param activityId
 * @returns Promise<boolean>
 */
async function doesActivityExist(activityId: Tables<"activities">["activity_id"]): Promise<boolean> {
  const { data, error } = await supabase
    .from("activities")
    .select("activity_id")
    .match({ activity_id: activityId })
    .maybeSingle();

  return data?.activity_id && !error ? true : false;
}

const ActivityIdSchema = z
  .number()
  .min(1, { message: "An activity ID must be provided" });
const UserIdSchema = z
  .string()
  .min(1, { message: "A user ID must be provided" });

/**
 *
 * @param activityId - The activity ID to check.
 * @param userId - The user ID to check.
 * @returns Promise<{validatedActivityId: string; validatedUserId: string} - Returns the validated properties from the schema.
 */

export async function validateActivityExistence(
  activityId?: Tables<"activities">["activity_id"],
  userId?: string
): Promise<{ validatedActivityId: number; validatedUserId: string }> {
  const activityIdResult = ActivityIdSchema.safeParse(activityId);
  if (!activityIdResult.success) {
    generateError(SAVE_ACTIVITY_ERRORS_CONSTANTS.InvalidActivityId);
  }
  const validatedActivityId = activityIdResult.data;

  const userIdResult = UserIdSchema.safeParse(userId);
  if (!userIdResult.success) {
    generateError(SAVE_ACTIVITY_ERRORS_CONSTANTS.InvalidUserId);
  }
  const validatedUserId = userIdResult.data;

  const isActivityAvailable = await doesActivityExist(validatedActivityId);
  if (!isActivityAvailable) {
    generateError(SAVE_ACTIVITY_ERRORS_CONSTANTS.ActivityNotExist);
  }

  return { validatedActivityId, validatedUserId };
}

/**
 * Handles adding or removing an activity for a user based on its existence in the database.
 * If the activity is already saved, it will be removed. If not, it will be saved.
 *
 * @param activityId The ID of the activity to add or remove.
 * @param userId The ID of the user performing the action.
 * @returns A success or error result indicating the outcome of the operation.
 */
export async function handleAddActivity(activityId: Tables<"saved-activities">["activity_id"]) {
  try {
    const userId = await getCurrentUserId();

    const { data: savedActivity, error } = await supabase
      .from("saved-activities")
      .select("*")
      .match({ activity_id: activityId, created_by_user_id: userId })
      .maybeSingle();

      console.log(error)

    if (error) {
      return generateErrorResult("Error retrieving saved activity", error);
    }

    // If the activity isn't saved, save it
    if (!savedActivity) {
      const res = await saveActivityByUserAndActivityId(activityId, userId);
      revalidatePath("/app/explore")
      return res;
    }

    // Delete the existing activity
    const res = deleteSavedActivityByUserAndActivityId(activityId, userId);
    return res;
  } catch (error) {
    console.error(error);
    return generateErrorResult("Error retrieving saved activity");
  }
}

async function saveActivityByUserAndActivityId(
  activityId?: Tables<"saved-activities">["activity_id"],
  userId?: string
) {
  try {
    const { validatedActivityId, validatedUserId } =
      await validateActivityExistence(activityId, userId);

    const { error } = await supabase.from("saved-activities").insert({
      created_by_user_id: validatedUserId,
      activity_id: Number(validatedActivityId),
    });



    if (error) {
      return generateErrorResult(
        SAVE_ACTIVITY_ERRORS_CONSTANTS.SaveActivityError,
        error
      );
    }

  

    if (!error) {
      return generateSuccessResult("Activity has successfully been saved!");
    }

    return generateErrorResult(
      SAVE_ACTIVITY_ERRORS_CONSTANTS.SaveActivityError
    );
  } catch (error) {
    console.error(error);
    return generateErrorResult(
      SAVE_ACTIVITY_ERRORS_CONSTANTS.SaveActivityError
    );
  }
}

export async function deleteSavedActivityByUserAndActivityId(
  activityId?: Tables<"activities">["activity_id"],
  userId?: string
) {
  try {
    const { validatedActivityId, validatedUserId } =
      await validateActivityExistence(activityId, userId);

    const { error } = await supabase
      .from("saved-activities")
      .delete()
      .match({ created_by_user_id: validatedUserId, activity_id: validatedActivityId });

    if (error) {
      return generateErrorResult(
        SAVE_ACTIVITY_ERRORS_CONSTANTS.DeleteActivityError,
        error
      );
    }

    if (!error) {
      return generateSuccessResult("Activity has successfully been deleted!");
    }

    return generateErrorResult(
      SAVE_ACTIVITY_ERRORS_CONSTANTS.DeleteActivityError
    );
  } catch (error) {
    console.error(error);
    return generateErrorResult(
      SAVE_ACTIVITY_ERRORS_CONSTANTS.DeleteActivityError
    );
  }
}

export async function getActivitySavedStatusAction(
  activityId: Tables<"saved-activities">["activity_id"]
): Promise<boolean> {
  const userId = await getCurrentUserId();


  const { data, error } = await supabase
    .from("saved-activities")
    .select("activity_id")
    .match({
      activity_id: activityId,
      created_by_user_id: userId,
    })
    .maybeSingle();

  if (data && !error) {
    return true;
  }

  if (error) {
    return false;
  }

  return false;
}
