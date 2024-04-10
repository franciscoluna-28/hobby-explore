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

function SavedIcon(): React.JSX.Element {
  return (
    <ActivityMotion>
      <FaBookmark className="h-5 w-5 text-mainGreen text-xl"></FaBookmark>
    </ActivityMotion>
  );
}

function NotSavedIcon(): React.JSX.Element {
  return (
    <ActivityMotion>
      <Bookmark className="h-6 w-6 text-slate-300"></Bookmark>
    </ActivityMotion>
  );
}

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
      {getActivitySaveStatus(activity.activity_id) ? (
        <SavedIcon />
      ) : (
        <NotSavedIcon />
      )}
    </Button>
  );
}
