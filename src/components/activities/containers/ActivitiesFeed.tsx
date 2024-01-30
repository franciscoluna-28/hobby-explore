import {
  ActivityQueryResponse,
  getTenRandomActivities,
} from "@/services/activities/getActivities";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export async function ActivitiesFeed() {
  const response = await getTenRandomActivities();

  // First case: activities is null
  if (response === null) {
    return <div>No activities available.</div>;
  }

  // Second case: activities throws an error
  if ("code" in response) {
    toast.error("Failed to fetch activities.");
    return <div>Error fetching activities.</div>;
  }

  // Now we're certain that response is of type ActivityQueryResponse[]
  const activities = response as ActivityQueryResponse[];

  // Render the activities feed
  // TODO: Return list of tips in API response
  return (
    <div className="space-y-6">
      {activities.map((activity) => (
       
          <Card
            key={activity.activity_id}
            className="rounded-2xl hover:shadow-md duration-200 max-w-[350px] max-h-[500px]"
          >
             <Link
        className="w-min bg-red-500"
          key={activity.activity_id}
          href={`activities/${activity.activity_id}`}
        >
            <div className="relative">
              <Badge className="absolute top-4 right-4 bg-mainBlack/60">
                2 tips
              </Badge>
              <img
                className="object-cover rounded-t-2xl w-full max-h-[200px]"
                src={activity.tips?.display_image_url ?? ""}
              />
            </div>
            <CardHeader>
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
                    {activity.users?.displayName ?? "User"}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {activity.activities?.created_at}
                  </p>
                </div>
              </div>
              <CardTitle className="leading-normal text-mainBlack">
                {activity.activities?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                {activity.activities?.participants}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <span>Created by: {activity.created_by_user_id}</span>
            </CardFooter>
            </Link>
          </Card>

      ))}
    </div>
  );
}
