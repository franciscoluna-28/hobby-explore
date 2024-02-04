import { ActivityCard } from "@/components/activities/ActivityCard";
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

  // TODO: ADD EMPTY ACTIVITIES COMPONENT HERE
  if (!currentUserActivities) {
    return <div>You don&apos;t have activities right now</div>;
  }

  // TODO: ADD ERROR COMPONENT
  if ("error" in currentUserActivities) {
    return <div>Auth or system error...</div>;
  }

  const activities = currentUserActivities as ActivityQueryResponse[];

  return (
    <div className="h-screen">
      <ul className="flex flex-wrap gap-6 justify-center">
        {activities.map((activity) => (
          <ActivityMotion key={activity.activity_id}>
            <ActivityCard key={activity.activity_id} activity={activity} />
          </ActivityMotion>
        ))}
      </ul>
    </div>
  );
}
