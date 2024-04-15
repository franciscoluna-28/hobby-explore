"use client";

import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import React from "react";
import useActivityStore from "@/store/useLandingPageActivities";
import { ActivityPreview } from "@/data/DefaultActivities";

type Props = {
  activity: ActivityPreview;
};

export function SaveActivityButtonReadOnly({ activity }: Props) {
  const handleSaveActivity = useActivityStore(
    (state) => state.handleSaveActivity
  );
  const getActivitySaveStatus = useActivityStore(
    (state) => state.getSaveStatus
  );

  return (
    <Button
      onClick={() => {
        handleSaveActivity(activity);
      }}
      variant="saveActivity"
    >
      <Bookmark
        className="duration-200 transition-all w-6 h-6"

        color="#9d9d9d"
        strokeWidth={`${
          getActivitySaveStatus(activity.activity_id)
            ? 0
            : 1.5
        }`}
        fill={`${
          getActivitySaveStatus(activity.activity_id)
            ? "#00CAA7"
            : "transparent"
        }`}
      />
    </Button>
  );
}
