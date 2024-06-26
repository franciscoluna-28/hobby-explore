"use server";

import { Tables } from "@/lib/database";
import { getCurrentUserId } from "@/services/auth";
import { generateErrorResult } from "@/services/errors/generateErrors";
import { generateSuccessResult } from "@/services/success/generateSuccess";
import supabaseServer from "@/utils/supabase/server";

const MINIMUM_RATING_VALUE: number = 1;
const MAXIMUM_RATING_VALUE: number = 5;
const DEFAULT_ACTIVITY_RATING_HELPER_VALUE: number = 0;

type ActivityId = Tables<"activities">["activity_id"];

const supabase = supabaseServer()

async function getRatingMeanInActivity(
  activityId: ActivityId
): Promise<number> {
  const { data, error } = await supabase.rpc("get_average_rating", {
    activity_id: activityId,
  });

  if (error) {
    console.error(error);
    return DEFAULT_ACTIVITY_RATING_HELPER_VALUE;
  }

  if (data) {
    return data;
  }

  return DEFAULT_ACTIVITY_RATING_HELPER_VALUE;
}

export type RatingCountAndMean = {
  count: number;
  rating: number;
};

export async function getExactRatingCountInActivityAction(
  activityId: ActivityId
): Promise<RatingCountAndMean> {
  if (!activityId) return {
    count: DEFAULT_ACTIVITY_RATING_HELPER_VALUE,
    rating: DEFAULT_ACTIVITY_RATING_HELPER_VALUE
  };

  const { error, data, count } = await supabase
    .from("activities_rating")
    .select("activity_id", { count: "exact" })
    .match({
      activity_id: activityId,
    });

  if (error) {
    return {
      count: DEFAULT_ACTIVITY_RATING_HELPER_VALUE,
      rating: DEFAULT_ACTIVITY_RATING_HELPER_VALUE
    };
  }

  if (data) {
    const rating = await getRatingMeanInActivity(activityId);

    return {
      count: count ?? 0,
      rating: rating,
    };
  }

  return {
    count: DEFAULT_ACTIVITY_RATING_HELPER_VALUE,
    rating: DEFAULT_ACTIVITY_RATING_HELPER_VALUE
  };
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
    return DEFAULT_ACTIVITY_RATING_HELPER_VALUE;
  }

  if (data) {
    return data.rating;
  }

  return DEFAULT_ACTIVITY_RATING_HELPER_VALUE;
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
