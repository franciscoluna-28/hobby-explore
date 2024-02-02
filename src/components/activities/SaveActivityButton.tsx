"use client";

import { Tables } from "@/lib/database";
import { Button } from "../ui/button";
import { FaBookmark } from "react-icons/fa";
import { handleAddActivity } from "@/services/activities/activitiesServices";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "sonner";

type Props = {
  isSaved?: boolean;
  isSaving?: boolean;
  userId?: Tables<"users">["user_id"];
  activityId?: Tables<"activities">["activity_id"];
};

async function handleSaveDeleteActivity(activityId: string) {
  const supabase = createClientComponentClient();
  const userId = (await supabase.auth.getUser()).data.user?.id;

  const res = await handleAddActivity(activityId, userId ?? "");

  toast.success(res.message);
}

// TODO: ADD STYLES TO BUTTON VARIANTS INSTEAD OF HARDCODING THE STYLES
export function SaveActivityButton({
  isSaved,
  isSaving,
  activityId,
  userId,
}: Props) {
  return (
    <Button
      onClick={() => handleSaveDeleteActivity(String(activityId ?? ""))}
      className="bg-white p-2 w-12 h-12 transition-all  hover:shadow-lg hover:border-mainGreen  hover:bg-white duration-200 rounded-full shadow-sm"
    >
      <FaBookmark className="text-mainGreen text-xl" />
    </Button>
  );
}
