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

  if (!currentUserActivities) {
    return <div>You don't have activities right now</div>;
  }

  if ("error" in currentUserActivities) {
    return <div>Auth or system error...</div>;
  }

  const activities = currentUserActivities as ActivityQueryResponse[];

  console.log(currentUserActivities);

  return (
    <div className="h-screen">
      <h1>My Activities</h1>
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
