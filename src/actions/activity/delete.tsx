"use server";

import { generateErrorResult } from "@/services/errors/generateErrors";
import { generateSuccessResult } from "@/services/success/generateSuccess";
import supabaseServer from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const supabase = supabaseServer()

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
