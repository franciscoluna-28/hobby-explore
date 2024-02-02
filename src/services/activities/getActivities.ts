"use server";

import { Database, Tables } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getCategoryIdByName } from "./categories";
import { ExistingActivityCategories } from "@/constants/activities/categories";

const supabase = createServerComponentClient<Database>({ cookies });

export type ActivityQueryResponse = Tables<"activities"> & {
  tips: Tables<"tips">[];
  users: Tables<"users"> | null;
};

// Query to retrieve the activity as well as their tips information
const RANDOM_ACTIVITY_WITH_TIPS_QUERY = "*, users(*), tips(*)";

// Response type
type Response = PostgrestError | ActivityQueryResponse[] | null;

export async function getTenRandomActivities(
  categoryName?: ExistingActivityCategories | null
): Promise<Response> {
  if (!categoryName) {
    const { data, error } = await supabase
      .from("activities")
      .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY);

    if (error) {
      return error;
    }

    return data;
  }

  const { data, error } = await supabase
    .from("activities")
    .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY)
    .match({ category_id: getCategoryIdByName(categoryName) });

  if (error) {
    return error;
  }

  return data;
}

/*
Function to retrieve an activity based on its id
@param - activityId: Refers to the activity's id to fetch
@return - Response: Returns an array of activities, an empty array or an error
*/
export async function getActivityById(activityId: string): Promise<Response> {
  const { data, error } = await supabase
    .from("activities")
    .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY)
    .match({ activity_id: activityId });

  if (error) {
    return error;
  }

  return data;
}

/*
Retrieves all the activities from a user
@param - userId: Refers to the user id to get the activities from
@return - Response: Returns an array of activities, an empty array or an error
*/
export async function getUserActivitiesByUserId(
  userId: string | undefined
): Promise<Response> {
  const { data, error } = await supabase
    .from("activities")
    .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY)
    .match({ created_by_user_id: userId ?? "" });

  if (error) {
    return error;
  }

  return data;
}
