"use client";

import { useGetActivities } from "@/hooks/activities/useGetActivities";
import { ActivityMotion } from "@/components/motion/ActivityMotion";
import { ActivityCard } from "../ActivityCard";
import { useSearchParams } from "next/navigation";
import { Tables } from "@/lib/database";
import { ActivityFeedSkeletons } from "@/components/skeletons/containers/ActivityFeedSkeleton";
import { NotFoundActivities } from "../NotFoundActivities";
import { ActivitiesLayout } from "./ActivitiesLayout";
import { GLOBAL_FIRST_PAGINATION_PAGE } from "@/constants/pagination/globals";
import { RatingReadOnly } from "@/components/rating/RatingOnlyRead";

type ActivitiesFeedProps = {
  userId: Tables<"users">["user_id"];
};

export function ActivitiesFeed({ userId }: ActivitiesFeedProps) {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? GLOBAL_FIRST_PAGINATION_PAGE;

  const { activities, isLoading, isError } = useGetActivities({
    page: Number(page),
  });

  if (isLoading) {
    return (
      <ActivityMotion>
        <ActivityFeedSkeletons />
      </ActivityMotion>
    );
  }

  if (activities.length === 0) {
    return (
      <ActivityMotion>
        <NotFoundActivities />
      </ActivityMotion>
    );
  }

  return (
    <>
      <ActivitiesLayout>
        {activities.map((activity) => (
          <ActivityMotion key={activity.activity_id}>
            <ActivityCard
              key={activity.activity_id}
              activity={activity}
              userId={userId}
            
            />

          </ActivityMotion>
        ))}
      </ActivitiesLayout>
    </>
  );
}
