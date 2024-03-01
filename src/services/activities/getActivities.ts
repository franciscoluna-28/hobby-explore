"use server";

import { Database, Tables } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getCategoryIdByName } from "./categories";
import { ExistingActivityCategories } from "@/constants/activities/categories";
import { handlePaginationGetFromAndTo } from "../pagination/paginationServices";
import { GLOBAL_FIRST_PAGINATION_PAGE } from "@/constants/pagination/globals";
import { GLOBAL_ACTIVITIES_PER_PAGE } from "@/constants/pagination/globals";
import { getCurrentUserId } from "../auth";

const supabase = createServerComponentClient<Database>({ cookies });

export async function getExactActivitiesCount(
  categoryName: ExistingActivityCategories | undefined
) {
  if (!categoryName) {
    const { error, data, count } = await supabase
      .from("activities")
      .select("activity_id", { count: "exact" });

    if (error) {
      return 0;
    }

    if (data) {
      return count;
    }

    return 0;
  }
  const { error, data, count } = await supabase
    .from("activities")
    .select("activity_id", { count: "exact" })
    .match({ category_id: getCategoryIdByName(categoryName) });

  if (error) {
    return 0;
  }

  if (data) {
    return count;
  }

  return 0;
}

export type ActivityQueryResponse = Tables<"activities"> & {
  tips: Tables<"tips">[],
  users: Tables<"users"> | null,
      average_rating: number
};

export type SavedActivitiesFromOtherUsersQueryResponse = {
  activity_id: Tables<"activities">["activity_id"];
  activities: {
    name: Tables<"activities">["name"];
    tips: Tables<"tips">[];
    users: Tables<"users">[] | null;
    location: Tables<"activities">["location"];
    created_at: Tables<"activities">["created_at"];
    activity_id: Tables<"activities">["activity_id"];
    category_id: Tables<"activities">["category_id"];
    description: Tables<"activities">["description"];
    accessibility_max_value: Tables<"activities">["accessibility_max_value"];
    accessibility_min_value: Tables<"activities">["accessibility_min_value"];
    average_rating: number
  };
};

// TODO: ONLY RETRIEVE THE TIP COUNT
// Query to retrieve the activity as well as their tips information
const RANDOM_ACTIVITY_WITH_TIPS_QUERY =
  "*, users!activities_created_by_user_id_fkey(user_id, username, profile_picture_url, displayName), tips(*), average_rating:activities_rating(activity_id).avg(rating), rating_count:activities_rating(activity_id).count(activity_id)";

// Query to retrieve activities saved by other users
const ACTIVITIES_WITH_TIPS_AND_USER_FROM_OTHER_USERS_QUERY =
  "activity_id, activities!inner(tips(*), *, users!activities_created_by_user_id_fkey(*), ratings_count:activities_rating!inner.count()) ";

// Response type
type Response =
  | PostgrestError
  | ActivityQueryResponse[]
  | null
  | SavedActivitiesFromOtherUsersQueryResponse[];

export async function getTenRandomActivities(
  page: number,
  categoryName?: ExistingActivityCategories | null
): Promise<Response> {
  const { from, to } = handlePaginationGetFromAndTo(
    page < GLOBAL_FIRST_PAGINATION_PAGE ? GLOBAL_FIRST_PAGINATION_PAGE : page,
    GLOBAL_ACTIVITIES_PER_PAGE
  );

  if (!categoryName) {
    const { data, error } = await supabase
      .from("activities")
      .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY)
      .range(from, to);

    console.log(data);

    if (error) {
      console.log(error);
      return error;
    }

    return data as unknown as Response;
  }

  const { data, error } = await supabase
    .from("activities")
    .select(`${RANDOM_ACTIVITY_WITH_TIPS_QUERY} `)
    .match({ category_id: getCategoryIdByName(categoryName) })
    .range(from, to);

  if (error) {
    return error;
  }

  return data as unknown as Response;
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

  return data as unknown as Response;
}

/*
Retrieves all the activities created from a user
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

  return data as unknown as Response;
}

export async function getCurrentUserSavedActivities(): Promise<Response> {
  const currentUserId = await getCurrentUserId();

  const { data, error } = await supabase
    .from("saved-activities")
    .select(ACTIVITIES_WITH_TIPS_AND_USER_FROM_OTHER_USERS_QUERY)
    .match({ created_by_user_id: currentUserId });

  if (error) {
    return error;
  }

  return data as unknown as SavedActivitiesFromOtherUsersQueryResponse[];
}
