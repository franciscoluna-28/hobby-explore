import {
  ActivityQueryResponse,
  getActivityById,
} from "@/services/activities/getActivities";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCategoryNameById } from "@/services/activities/categories";
import { handleDateConversion } from "@/lib/dates/dateConversion";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import TipCarousel from "@/components/tips/TipCarousel";
import RatingContainer from "@/components/rating/RatingContainer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import { ActivityBreadCrumb } from "@/components/layout/ActivityBreadcrumb";
import { getCurrentUserId } from "@/services/auth";

export async function generateMetadata({
  params,
}: {
  params: {
    activityId: string;
  };
}): Promise<Metadata> {
  const activityData = await getActivityById(params.activityId);

  if (activityData === null) {
    return {
      title: "Unknown Activity",
      description: "Unknown",
    };
  }

  // Now we're certain that response is of type ActivityQueryResponse[]
  const activity = activityData as ActivityQueryResponse[];

  return {
    title: activity[0].name,
    description: activity[0].description,
    openGraph: {
      images: [
        getSupabaseFileUrlFromRelativePath(
          activity[0].tips[0].display_image_url ?? "",
          "tips"
        ),
      ],
    },
  };
}

export default async function ActivityPage({
  params,
}: {
  params: {
    activityId: string;
  };
}) {
  const activityData = await getActivityById(params.activityId);
  const userId = await getCurrentUserId();

  // TODO: CREATE CUSTOM COMPONENT
  // First case: activities is null
  if (activityData === null) {
    return <div>No activities available.</div>;
  }

  // TODO: CREATE CUSTOM COMPONENT
  // Second case: activities throws an error
  if ("code" in activityData) {
    toast.error("Failed to fetch activities.");
    return <div>Error fetching activity.</div>;
  }

  // Now we're certain that response is of type ActivityQueryResponse[]
  const activity = activityData as ActivityQueryResponse[];

  // TODO: CREATE A COMMON AVATAR COMPONENT FOR THE USER INSTEAD OF CODING IT EVERY SINGLE TIME LOL
  // TODO: WRITE UNIT TEST WITHOUT USING THE API TO TEST DIFFERENT BEHAVIORS
  return (
    <section className="w-full m-auto flex flex-col h-full max-w-[900px] ">
      <ActivityBreadCrumb activityName={activity[0].name ?? ""} />
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={getSupabaseFileUrlFromRelativePath(
              activity[0].users?.profile_picture_url ?? "",
              "avatars"
            )}
            alt="@shadcn"
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="">
          <p className="text-darkGray font-medium text-sm">
            {activity[0].users?.displayName &&
            activity[0].users?.displayName !== ""
              ? activity[0].users?.displayName
              : "User"}
          </p>
          <p className="text-gray text-sm">
            {handleDateConversion(activity[0].created_at)}
          </p>
        </div>
      </div>
      <h2
        className="text-mainBlack text-3xl font-semibold leading-normal my-3"
        test-id={"activityTitle"}
      >
        {activity[0].name}
      </h2>
      <p className="text-slate-500 text-sm mb-6">{activity[0].description}</p>
      <Badge variant="secondary" className="w-fit">
        {getCategoryNameById(activity[0].category_id)}
      </Badge>
      <section className="mr-auto">
        <TipCarousel tips={activity[0].tips} />
      </section>
      <h3 className="my-6">Learn More 📕</h3>
      <section>
        <div className="flex gap-8 items-center my-6 flex-wrap lg:flex-nowrap w-full">
          <Card className="lg:max-w-[300px] w-full">
            <CardHeader>
              <CardTitle>Accessibility</CardTitle>
              <CardDescription>
                Learn about the cost of the activity here.
              </CardDescription>
            </CardHeader>
            <CardContent className="!m-0 !pl-2">
              <p className="font-medium ml-4 flex items-center text-sm">
                Value:{" "}
                {activity[0].accessibility_min_value === 0 &&
                activity[0].accessibility_max_value === 0
                  ? "Free"
                  : `${activity[0].accessibility_min_value} - ${activity[0].accessibility_max_value}`}{" "}
              </p>
            </CardContent>
          </Card>
          <Card className="lg:max-w-[300px] w-full">
            <CardHeader>
              <CardTitle>Participants</CardTitle>
              <CardDescription>
                How many participants are in the activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="!m-0 !pl-2">
              <p className="font-medium ml-4 flex items-center text-sm">
                Participants: {activity[0].participants}
              </p>
            </CardContent>
          </Card>

          <Card className="lg:max-w-[300px] w-full">
            <CardHeader>
              <CardTitle>Rating</CardTitle>
              <CardDescription>
                Support the activity creator by rating their activity.
              </CardDescription>
            </CardHeader>
            <CardContent className="">
              {userId ? (
                <RatingContainer activityId={activity[0].activity_id} />
              ) : (
                <span className="text-sm font-medium">
                  You cannot rate as a guest.
                </span>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </section>
  );
}
