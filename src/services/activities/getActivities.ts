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

  console.log(data, error);

  if (error) {
    return error;
  }

  return data;
}

/*
Function to retrieve an activity based on its id
@param - activityId: Refers to the activity's id to fetch
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
