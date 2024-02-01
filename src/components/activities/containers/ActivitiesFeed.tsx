"use client";

import { useGetActivities } from "@/hooks/activities/useGetActivities";
import { ActivityFeedSkeletons } from "@/components/skeletons/containers/ActivityFeedSkeleton";
import { ActivityMotion } from "@/components/motion/ActivityMotion";
import { NotFoundActivities } from "../NotFoundActivities";
import { ActivityCard } from "../ActivityCard";

export function ActivitiesFeed() {
  const { activities, isLoading } = useGetActivities();

  if (isLoading) {
    return (
      <ActivityMotion>
        <ActivityFeedSkeletons />
      </ActivityMotion>
    );
  }

  if (!activities.length) {
    return <NotFoundActivities />;
  }

  return (
    <ActivityMotion>
      {activities.map((activity) => (
        <ActivityCard activity={activity} />
      ))}
    </ActivityMotion>
  );
}
