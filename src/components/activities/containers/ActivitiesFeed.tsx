"use client"

import { useGetActivities } from "@/hooks/activities/useGetActivities";
import { ActivityMotion } from "@/components/motion/ActivityMotion";
import { ActivityCard } from "../ActivityCard";
import { useSearchParams } from "next/navigation";
import { ActivityFeedSkeletons } from "@/components/skeletons/containers/ActivityFeedSkeleton";
import { NotFoundActivities } from "../NoFoundActivities";
import { ActivitiesLayout } from "./ActivitiesLayout";
import { GLOBAL_FIRST_PAGINATION_PAGE } from "@/constants/pagination/globals";
import { useGetCurrentUser } from "@/hooks/user/useGetCurrentUser";

export function ActivitiesFeed() {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? GLOBAL_FIRST_PAGINATION_PAGE;
  const { data: user } = useGetCurrentUser();


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
              shouldRenderOptionsMenu={false}
              key={activity.activity_id}
              activity={activity}
              userId={user?.user_id}
            />
          </ActivityMotion>
        ))}
      </ActivitiesLayout>
    </>
  );
}
