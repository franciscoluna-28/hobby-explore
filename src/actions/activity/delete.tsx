"use server";

import { Database } from "@/lib/database";
import { generateErrorResult } from "@/services/errors/generateErrors";
import { generateSuccessResult } from "@/services/success/generateSuccess";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const supabase = createServerComponentClient<Database>({ cookies });

export async function deleteActivityByIdAction(activityId: number) {
  const { error } = await supabase.from("activities").delete().match({
    activity_id: activityId,
  });

  if (error) {
    return generateErrorResult("There was an error deleting activity", error);
  }

  revalidatePath("/app/saved/my-activities");
  return generateSuccessResult("Activity deleted successfully!");


}
