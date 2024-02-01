"use client";

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
import { useGetActivities } from "@/hooks/activities/useGetActivities";
import { ActivityFeedSkeletons } from "@/components/skeletons/containers/ActivityFeedSkeleton";

export function ActivitiesFeed() {
  const { activities, isLoading } = useGetActivities();

  if (!isLoading) {
    return <ActivityFeedSkeletons />;
  }

  // TODO: CREATE A PROPER COMPONENT TO DISPLAY THIS
  if (!activities.length) {
    return <div>No activities available.</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6">
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
                {activity.tips.length}{" "}
                {activity.tips.length > 1 ? "tips" : "tip"}
              </Badge>
              <img
                className="object-cover rounded-t-2xl w-full max-h-[200px]"
                src={
                  activity.tips.length
                    ? activity.tips[0].display_image_url!
                    : ""
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
                <div className="space-y-2">
                  <p className="text-darkGray font-medium text-sm">
                    {activity.users?.displayName ?? "User"}
                  </p>
                  <p className="text-slate-600 text-sm">
                    {activity.created_at}
                  </p>
                </div>
              </div>
              <CardTitle className="leading-normal text-mainBlack">
                {activity.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{activity.participants}</CardDescription>
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
