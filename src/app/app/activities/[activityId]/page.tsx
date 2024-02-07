import {
  ActivityQueryResponse,
  getActivityById,
} from "@/services/activities/getActivities";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCategoryNameById } from "@/services/activities/categories";
import { handleDateConversion } from "@/lib/dates/dateConversion";
import { TipCarouselCard } from "@/components/tips/TipCarouselCard";



export default async function ActivityPage({
  params,
}: {
  params: {
    activityId: string;
  };
}) {
  // Dude three hours here just to get all the goddamn tips LOL
  const activityData = await getActivityById(params.activityId);

  // First case: activities is null
  if (activityData === null) {
    return <div>No activities available.</div>;
  }

  // Second case: activities throws an error
  if ("code" in activityData) {
    toast.error("Failed to fetch activities.");
    return <div>Error fetching activity.</div>;
  }

  // Now we're certain that response is of type ActivityQueryResponse[]
  const activity = activityData as ActivityQueryResponse[];

  console.log(activity);

  return (
    <section>
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <p className="text-darkGray font-medium text-sm">
            {activity[0].users?.displayName ?? "User"}
          </p>
          <p className="text-gray text-sm">
            {handleDateConversion(activity[0].created_at)}
          </p>
        </div>
      </div>
      <h2 className="text-mainBlack text-3xl font-semibold leading-normal my-4">
        {activity[0].name}
      </h2>
      <Badge variant="secondary">
        {getCategoryNameById(activity[0].category_id)}
      </Badge>
      <section className="my-6 flex gap-4">
    {activity[0].tips.map((tip) => {
      return (
        <TipCarouselCard tip={tip}/>
      )
    })}
      </section>
    </section>
  );
}
