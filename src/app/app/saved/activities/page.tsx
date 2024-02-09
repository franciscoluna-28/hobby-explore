import { ActivityCard } from "@/components/activities/ActivityCard";
import { NoExistingSavedActivities } from "@/components/activities/NoExistingSavedActivities";
import { NotFoundActivities } from "@/components/activities/NotFoundActivities";
import { ActivityMotion } from "@/components/motion/ActivityMotion";
import {
  ActivityQueryResponse,
  SavedActivitiesFromOtherUsersQueryResponse,
  getCurrentUserSavedActivities,
  getUserActivitiesByUserId,
} from "@/services/activities/getActivities";
import { getCurrentUser } from "@/services/auth";

export default async function SavedActivities() {
  const savedActivities = await getCurrentUserSavedActivities();

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

  if (activities.length === 0) {
    return (
      <ActivityMotion>
        <NoExistingSavedActivities />
      </ActivityMotion>
    );
  }

  return (
    <div className="h-screen">
      <ul className="flex flex-wrap gap-6 justify-center">
        {activities.map((activity) => (
          <ActivityMotion key={activity.activities?.activity_id}>
            <ActivityCard
              key={activity.activities?.activity_id}
              activity={activity?.activities as ActivityQueryResponse}
            />
          </ActivityMotion>
        ))}
      </ul>
    </div>
  );
}
