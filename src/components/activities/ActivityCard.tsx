import { Tables } from "@/lib/database";
import { ActivityQueryResponse } from "@/services/activities/getActivities";
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
import { handleDateConversion } from "@/lib/dates/dateConversion";

type Props = {
  activity: ActivityQueryResponse;
};

export function ActivityCard({ activity }: Props) {
  return (
    <li>
      <Card className="rounded-2xl hover:shadow-md duration-200 w-[350px] h-[500px]">
        <Link
          className="w-min bg-red-500"
          key={activity.activity_id}
          href={`activities/${activity.activity_id}`}
        >
          <div className="relative">
            <Badge className="absolute top-4 right-4 bg-mainBlack/60">
              {activity.tips.length} {activity.tips.length > 1 ? "tips" : "tip"}
            </Badge>
            <img
              className="object-cover rounded-t-2xl w-full max-h-[200px]"
              src={
                activity.tips.length ? activity.tips[0].display_image_url! : ""
              }
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
              <div className="">
                <p className="text-darkGray font-medium text-sm">
                  {activity.users?.displayName ?? "User"}
                </p>
                <p className="text-slate-600 text-sm">
                  {handleDateConversion(activity.created_at)}
                </p>
              </div>
            </div>
            <CardTitle className="leading-normal pt-2 text-mainBlack">
              {activity.name}
            </CardTitle>
          </CardHeader>
          <CardContent></CardContent>
          <CardFooter></CardFooter>
        </Link>
      </Card>
    </li>
  );
}
