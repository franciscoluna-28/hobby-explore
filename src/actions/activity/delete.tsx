"use server";

import { Database } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });

export async function deleteActivityByIdAction(activityId: number) {
  const { error } = await supabase.from("activities").delete().match({
    activity_id: activityId,
  });

  if (error) {
    throw new Error(error.message);
  }

  console.log("Activity deleted successfully");
}
