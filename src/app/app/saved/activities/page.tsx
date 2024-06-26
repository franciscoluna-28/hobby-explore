import { ActivityCard } from "@/components/activities/ActivityCard";
import { ActivitiesLayout } from "@/components/activities/containers/ActivitiesLayout";
import { NoExistingSavedActivities } from "@/components/activities/NoExistingSavedActivities";
import { NotFoundActivities } from "@/components/activities/NoFoundActivities";
import { ActivityMotion } from "@/components/motion/ActivityMotion";
import {
  ActivityQueryResponse,
  SavedActivitiesFromOtherUsersQueryResponse,
  getCurrentUserSavedActivities,
} from "@/services/activities/getActivities";
import { getCurrentUser, getCurrentUserId } from "@/services/auth";

export default async function SavedActivities() {
  const savedActivities = await getCurrentUserSavedActivities();
  const currentUserId = await getCurrentUserId();

  const EMPTY_ACTIVITY_ARRAY_LENGTH: number = 0;

  if (!currentUserId) {
    return <NoExistingSavedActivities isNotAuthenticatedUser />;
  }

  // TODO: REFACTOR THIS TO ANOTHER COMPONENT
  if (savedActivities && "error" in savedActivities) {
    return (
      <ActivityMotion>
        <NotFoundActivities />
      </ActivityMotion>
    );
  }

  const activities =
    savedActivities as SavedActivitiesFromOtherUsersQueryResponse[];

  if (activities.length === EMPTY_ACTIVITY_ARRAY_LENGTH) {
    return (
      <ActivityMotion>
        <NoExistingSavedActivities />
      </ActivityMotion>
    );
  }

  return (
    <div className="h-screen">
      <ActivitiesLayout>
        {activities.map((activity) => (
          <ActivityMotion key={activity.activities?.activity_id}>
            <ActivityCard
              key={activity.activities?.activity_id}
              activity={activity?.activities as ActivityQueryResponse}
              userId={currentUserId}
            />
          </ActivityMotion>
        ))}
</ActivitiesLayout>
    </div>
  );
}
