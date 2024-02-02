"use client";

import { useGetActivities } from "@/hooks/activities/useGetActivities";
import { ActivityFeedSkeletons } from "@/components/skeletons/containers/ActivityFeedSkeleton";
import { ActivityMotion } from "@/components/motion/ActivityMotion";
import { NotFoundActivities } from "../NotFoundActivities";
import { ActivityCard } from "../ActivityCard";
import { useSearchParams } from "next/navigation";

export function ActivitiesFeed() {
  const searchParams = useSearchParams();
  const currentPage = searchParams.get("page");
  const { activities, isLoading } = useGetActivities({
    page: Number(currentPage),
  });

  if (isLoading) {
    return <ActivityFeedSkeletons />;
  }

  if (!activities.length) {
    return <NotFoundActivities />;
  }

  return (
    <>
      <ul className="flex flex-wrap gap-6 justify-center">
        {activities.map((activity) => (
          <ActivityMotion key={activity.activity_id}>
            <ActivityCard key={activity.activity_id} activity={activity} />
          </ActivityMotion>
        ))}
      </ul>
    </>
  );
}
