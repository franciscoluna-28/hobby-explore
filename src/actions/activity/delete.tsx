"use server";

import { Database } from "@/lib/database";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });

export async function deleteActivityByIdAction(activityId: number) {
  const { error } = await supabase.from("activities").delete().match({
    activity_id: activityId,
  });

  if (error) {
    console.error(error)
    throw new Error(error.message);
  }

  revalidatePath("/app/saved/my-activities");

}
