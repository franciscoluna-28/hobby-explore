"use server";

import { Database, Tables } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { getCategoryIdByName } from "./categories";
import { ExistingActivityCategories } from "@/constants/activities/categories";

const supabase = createServerComponentClient<Database>({ cookies });

type PaginationSetup = {
  from: number;
  to: number;
};

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

function getFromAndTo(page: number, limit: number): PaginationSetup {
  page = Math.max(page, 1);
  limit = Math.max(limit, 1);
  page = page - 1;

  const from = page * limit;
  const to = from + limit - 1;

  return { from, to };
}

export type ActivityQueryResponse = Tables<"activities"> & {
  tips: Tables<"tips">[];
  users: Tables<"users"> | null;
};

// Query to retrieve the activity as well as their tips information
const RANDOM_ACTIVITY_WITH_TIPS_QUERY =
  "*, users!activities_created_by_user_id_fkey(*), tips(*)";

// Response type
type Response = PostgrestError | ActivityQueryResponse[] | null;

const ITEMS_PER_PAGE: number = 9;
const FIRST_PAGE: number = 1;

export async function getTenRandomActivities(
  page: number,
  categoryName?: ExistingActivityCategories | null
): Promise<Response> {
  const { from, to } = getFromAndTo(
    page < FIRST_PAGE ? FIRST_PAGE : page,
    ITEMS_PER_PAGE
  );

  if (!categoryName) {
    const { data, error } = await supabase
      .from("activities")
      .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY)
      .range(from, to);

    if (error) {
      return error;
    }

    return data;
  }

  const { data, error } = await supabase
    .from("activities")
    .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY)
    .match({ category_id: getCategoryIdByName(categoryName) })
    .range(from, to);

  console.log("data is: ", data, error);

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
