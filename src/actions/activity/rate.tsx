"use server";

import { Database, Tables } from "@/lib/database";
import { getCurrentUserId } from "@/services/auth";
import { generateErrorResult } from "@/services/errors/generateErrors";
import { generateSuccessResult } from "@/services/success/generateSuccess";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const MINIMUM_RATING_VALUE: number = 1;
const MAXIMUM_RATING_VALUE: number = 5;
const DEFAULT_ACTIVITY_RATING_HELPER_VALUE: number = 0;

type ActivityId = Tables<"activities">["activity_id"];

const supabase = createServerComponentClient<Database>({ cookies });

export async function getExactRatingCountInActivityAction(
  activityId: ActivityId
): Promise<number> {
  if (!activityId) return DEFAULT_ACTIVITY_RATING_HELPER_VALUE;

  const { error, data, count } = await supabase
    .from("activities_rating")
    .select("activity_id", { count: "exact" }).match({
      activity_id: activityId
    });

    console.log(count)

  if (error) {
    return DEFAULT_ACTIVITY_RATING_HELPER_VALUE;
  }

  if (data) {
    return count ?? DEFAULT_ACTIVITY_RATING_HELPER_VALUE;
  }

  return DEFAULT_ACTIVITY_RATING_HELPER_VALUE;
}

export async function getCurrentActivityRatingAction(
  activityId: ActivityId
): Promise<number> {
  const userId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("activities_rating")
    .select("*")
    .match({
      activity_id: activityId,
      user_id: userId,
    })
    .maybeSingle();

  if (!data && error) {
    return 0;
  }

  if (data) {
    return data.rating;
  }

  return 0;
}

async function updateActivityRating(
  activityId: ActivityId,
  rating: number,
  userId: Tables<"users">["user_id"]
) {
  const { error: updateError, data } = await supabase
    .from("activities_rating")
    .update({
      rating: rating,
    })
    .match({
      user_id: userId,
      activity_id: activityId,
    });

  if (updateError) {
    return generateErrorResult(
      `Error updating rating for activity with id: ${activityId}`,
      updateError
    );
  }

  return generateSuccessResult("Your rating has been updated successfully!");
}

export async function rateActivityAction(
  activityId: ActivityId,
  rating: number
) {
  const userId = await getCurrentUserId();

  if (!userId) return;

  if (!activityId) return;

  const { data: activityRating, error } = await supabase
    .from("activities_rating")
    .select("*")
    .match({
      activity_id: activityId,
      user_id: userId,
    })
    .maybeSingle();

  if (error) {
    return generateErrorResult(
      `Error retrieving rating for activity with id: ${activityId}`,
      error
    );
  }

  if (activityRating) {
    await updateActivityRating(activityId, rating, userId);
  }

  if (!activityRating) {
    const { error } = await supabase.from("activities_rating").insert({
      activity_id: activityId,
      user_id: userId,
      rating: rating,
    });

    if (error) {
      return generateErrorResult(
        "There was an error adding your rating...",
        error
      );
    }
  }

  return generateSuccessResult("Your rating has been added successfully!");
}
