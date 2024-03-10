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

export function SaveActivityButton({ activityId }: Props) {
  const { mutation, initialData } = useSaveActivity({
    activityId: activityId!,
  });

  return (
    <Button
      disabled={mutation.isPending}
      onClick={() => (

        mutation.mutate(activityId!)
        
      )}
      className="bg-white disabled:opacity-100 p-2 w-12 h-12 transition-all  hover:shadow-lg hover:border-mainGreen  hover:bg-white duration-200 rounded-full shadow-sm"
    >
      {initialData ? <SavedIcon /> : <NotSavedIcon />}
    </Button>
  );
}
