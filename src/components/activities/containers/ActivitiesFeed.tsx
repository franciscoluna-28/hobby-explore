"use client";

import { useGetActivities } from "@/hooks/activities/useGetActivities";
import { ActivityFeedSkeletons } from "@/components/skeletons/containers/ActivityFeedSkeleton";
import { ActivityMotion } from "@/components/motion/ActivityMotion";
import { NotFoundActivities } from "../NotFoundActivities";
import { ActivityCard } from "../ActivityCard";

export function ActivitiesFeed() {
  const { activities, isLoading } = useGetActivities();

  if (isLoading) {
    return <ActivityFeedSkeletons />;
  }

  if (!activities.length) {
    return <NotFoundActivities />;
  }

  return (
    <ul className="flex flex-wrap gap-6 justify-center">
      {activities.map((activity) => (
        <ActivityMotion>
          <ActivityCard key={activity.activity_id} activity={activity} />
        </ActivityMotion>
      ))}
    </ul>
  );
}
