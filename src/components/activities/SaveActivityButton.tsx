"use client";

import { Tables } from "@/lib/database";
import { Button } from "../ui/button";
import { useSaveActivity } from "@/hooks/activities/useSaveActivity";
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
      <Bookmark
        className="duration-200 transition-all"
        width={24}
        height={24}
        color="#9d9d9d"
        strokeWidth={`${initialData ? 0 : 1.5}`}
        fill={`${initialData ? "#00CAA7" : "transparent"}`}
      />
    </Button>
  );
}
