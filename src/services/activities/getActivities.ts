"use server";

import { Database, Tables } from "@/lib/database";
import { cookies } from "next/headers";
import { getCategoryIdByName } from "@/services/activities/categories";
import { ExistingActivityCategories } from "@/constants/activities/categories";
import { handlePaginationGetFromAndTo } from "@/services/pagination/paginationServices";
import { GLOBAL_FIRST_PAGINATION_PAGE } from "@/constants/pagination/globals";
import { GLOBAL_ACTIVITIES_PER_PAGE } from "@/constants/pagination/globals";
import { getCurrentUserId } from "@/services/auth";
import { createSupabaseServerClient } from "@/utils/supabase/server";
import { PostgrestError } from "@supabase/supabase-js";

const cookieStore = cookies()

export async function getExactActivitiesCount(
  categoryName: ExistingActivityCategories | undefined
) {
  if (!categoryName) {
    const { error, data, count } = await createSupabaseServerClient()
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
  const { error, data, count } = await createSupabaseServerClient()
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

type AverageRatings = {
  avg: number;
};

type AverageCounts = {
  count: number;
};

export type ActivityQueryResponse = Tables<"activities"> & {
  tips: Tables<"tips">[];
  users: Tables<"users"> | null;
  average_rating: AverageRatings[];
  ratings_count: AverageCounts[];
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
    average_rating: AverageRatings[];
    ratings_count: AverageCounts[];
  };
};

/** Query to retrieve the activity with its tips. Additionally, we've added rating counts and averages! There's no need to fetch it from the components anymore. */
const RANDOM_ACTIVITY_WITH_TIPS_QUERY =
  "*, users!activities_created_by_user_id_fkey(user_id, username, profile_picture_url, displayName), tips(*), average_rating:activities_rating(rating.avg()), ratings_count:activities_rating(count)";

// Query to retrieve activities saved by other users
const ACTIVITIES_WITH_TIPS_AND_USER_FROM_OTHER_USERS_QUERY =
  "activity_id, activities!inner(tips(*), *, average_rating:activities_rating(rating.avg()), ratings_count:activities_rating(count), users!activities_created_by_user_id_fkey(*))";

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

  const baseQuery = createSupabaseServerClient()
    .from("activities")
    .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY)
    .order("activity_id", { ascending: false })
    .range(from, to);

  if (!categoryName) {
    const { data, error } = await baseQuery;

    if (error) {
      console.error(error);
      return error;
    }

    return data as unknown as Response;
  }

  const { data, error } = await baseQuery.match({
    category_id: getCategoryIdByName(categoryName),
  });

  if (error) {
    console.error(error);
    return error;
  }

  return data as unknown as Response;
}

/*
Retrieves an activity based on its id
@param - activityId: Refers to the activity's id to fetch
@return - Response: Returns an array of activities, an empty array or an error
*/
export async function getActivityById(activityId: string): Promise<Response> {
  const { data, error } = await createSupabaseServerClient()
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
  const { data, error } = await createSupabaseServerClient()
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

  const { data, error } = await createSupabaseServerClient()
    .from("saved-activities")
    .select(ACTIVITIES_WITH_TIPS_AND_USER_FROM_OTHER_USERS_QUERY)
    .match({ created_by_user_id: currentUserId });

  console.log(data);

  if (error) {
    return error;
  }

  console.log(data);

  return data as unknown as SavedActivitiesFromOtherUsersQueryResponse[];
}
