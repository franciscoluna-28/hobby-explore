import {
  ActivityQueryResponse,
  getActivityById,
} from "@/services/activities/getActivities";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCategoryNameById } from "@/services/activities/categories";


export default async function ActivityPage({
  params,
}: {
  params: {
    activityId: string;
  };
}) {
  // Dude three hours here just to get all the goddamn tips LOL
  const activityData = await getActivityById(params.activityId);

  // TODO: CREATE A COMPONENT TO DEAL WITH THIS THING INSTEAD OF HANDLING THE CASES INDEPENDENTLY
  // TODO: DO EXACTLY THE SAME THING IN THE ACTIVITY RESPONSE THING
  // First case: activities is null
  if (activityData === null) {
    return <div>No activities available.</div>;
  }

  // Second case: activities throws an error
  if ("code" in activityData) {
    toast.error("Failed to fetch activities.");
    return <div>Error fetching activities.</div>;
  }

  // Now we're certain that response is of type ActivityQueryResponse[]
  const activity = activityData as ActivityQueryResponse[];

  return (
    <section>
    <div className="flex items-center gap-2">
    <Avatar>
      <AvatarImage
        src="https://github.com/shadcn.png"
        alt="@shadcn"
      />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <div className="space-y-2">
      <p className="text-darkGray font-medium text-sm">
        {activity[0].users?.displayName ?? "User"}
      </p>
      <p className="text-slate-600 text-sm">
        {activity[0].users?.created_at}
      </p>
    </div>

  </div>
  <h2 className="text-mainBlack text-3xl font-semibold leading-normal">{activity[0].name}</h2>
  <Badge>{getCategoryNameById(activity[0].category_id)}</Badge>
  </section>
  );
}
