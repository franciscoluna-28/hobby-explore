"use client";

import { Tables } from "@/lib/database";
import { Button } from "../ui/button";
import { useSaveActivity } from "@/hooks/activities/useSaveActivity";
import { FaBookmark } from "react-icons/fa6";
import { Bookmark } from "lucide-react";
import React from "react";
import { ActivityMotion } from "../motion/ActivityMotion";

type Props = {
  isSaved?: boolean;
  isSaving?: boolean;
  userId?: Tables<"users">["user_id"];
  activityId?: Tables<"activities">["activity_id"];
};

export function SaveActivityButton({ activityId, userId }: Props) {
  const { mutation, initialData } = useSaveActivity({
    activityId: activityId!,
  });

  return (
    <Button
      disabled={mutation.isPending || !userId}
      onClick={() => mutation.mutate(activityId!)}
      variant="saveActivity"
    >
      <FaBookmark
        className="duration-200 transition-all w-6 h-6"
        color="#000000"
        strokeWidth={`${initialData ? 0 : 4}`}
        fill={`${initialData ? "#00CAA7" : "transparent"}`}
      />
    </Button>
  );
}
