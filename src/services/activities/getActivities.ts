"use server";

import { Database, Tables } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { PostgrestError } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });

type TipsRelationships = Tables<"tips_relationships">;

export type ActivityQueryResponse = TipsRelationships & {
  tips: Tables<"tips"> | null;
  activities: Tables<"activities"> | null;
  users: Tables<"users"> | null;
};

const RANDOM_ACTIVITY_WITH_TIPS_QUERY =
  "activity_id, tip_id, tips(*), created_by_user_id, activities(*), users(*)";

type Response = PostgrestError | ActivityQueryResponse[] | null;

export async function getTenRandomActivities(): Promise<Response> {
  const { data, error } = await supabase
    .from("tips_relationships")
    .select(RANDOM_ACTIVITY_WITH_TIPS_QUERY);

  if (error) {
    return error;
  }

  return data;
}
