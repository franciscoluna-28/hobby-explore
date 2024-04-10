"use client";

import { Button } from "../ui/button";
import { FaBookmark } from "react-icons/fa6";
import { Bookmark } from "lucide-react";
import React from "react";
import { ActivityMotion } from "../motion/ActivityMotion";
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

  const activities = useActivityStore((state) => state.activities);

  return (
    <Button
      onClick={() => {
        handleSaveActivity(activity);
      }}
      variant="saveActivity"
    >
      <FaBookmark
        className="duration-200 transition-all w-6 h-6"

        color="#000000"
        strokeWidth={`${
          getActivitySaveStatus(activity.activity_id)
            ? 0
            : 4
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
