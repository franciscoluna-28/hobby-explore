import { ActivityCard } from "@/components/activities/ActivityCard";
import { ActivitiesLayout } from "@/components/activities/containers/ActivitiesLayout";
import { NoExistingSavedActivities } from "@/components/activities/NoExistingSavedActivities";
import { ActivityMotion } from "@/components/motion/ActivityMotion";
import {
  ActivityQueryResponse,
  getUserActivitiesByUserId,
} from "@/services/activities/getActivities";
import { getCurrentUser } from "@/services/auth";

export default async function MyActivities() {
  const currentUser = await getCurrentUser();

  const currentUserActivities = await getUserActivitiesByUserId(
    currentUser?.user_id
  );

  if (!currentUser) {
    return <NoExistingSavedActivities isNotAuthenticatedUser />;
  }

  // TODO: ADD EMPTY ACTIVITIES COMPONENT HERE
  if (!currentUserActivities) {
    return <div>Auth or system error...</div>;
  }

  // TODO: ADD ERROR COMPONENT
  if ("error" in currentUserActivities) {
    return <div>Auth or system error...</div>;
  }

  if (
    Array.isArray(currentUserActivities) &&
    currentUserActivities.length === 0
  ) {
    return <NoExistingSavedActivities shouldBeYourOwnActivities />;
  }

  const activities = currentUserActivities as ActivityQueryResponse[];

  return (
    <div className="h-screen">
    <ActivitiesLayout>
        {activities.map((activity) => (
          <ActivityMotion key={activity.activity_id}>
            <ActivityCard
              key={activity.activity_id}
              activity={activity}
              userId={currentUser?.user_id ?? ""}
            />
          </ActivityMotion>
        ))}
</ActivitiesLayout>
    </div>
  );
}
