import { ActivityQueryResponse } from "@/services/activities/getActivities";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { handleDateConversion } from "@/lib/dates/dateConversion";
import { SaveActivityButton } from "./SaveActivityButton";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import Sample from "../../../public/sample.jpg";
import { Tables } from "@/lib/database";
import { RatingReadOnly } from "../rating/RatingOnlyRead";
import { DeleteActivityDialog } from "./DeleteActivityDialog";
import { ActivityDropdownMenu } from "./ActivityDropdownMenu";

const DEFAULT_USER_NAME = "Shadcn";
const DEFAULT_USER_DISPLAY_NAME = "User";
const YOUR_NAME_IN_YOUR_ACTIVITY_DISPLAY_NAME = "You";

type Props = {
  activity: ActivityQueryResponse;
  userId?: Tables<"users">["user_id"];
  shouldRenderOptionsMenu?: boolean;
};

const isCreatedByCurrentUser = (
  activityUserId: Tables<"users">["user_id"],
  userId?: Tables<"users">["user_id"]
): boolean => {
  if (userId && userId === activityUserId) return true;
  return false;
};

const renderCurrentUserString = (
  activityUserId: string,
  activityUserDisplayName: string | null,
  userId?: string
) => {
  if (isCreatedByCurrentUser(activityUserId, userId)) {
    return YOUR_NAME_IN_YOUR_ACTIVITY_DISPLAY_NAME;
  }

  return activityUserDisplayName
    ? activityUserDisplayName
    : DEFAULT_USER_DISPLAY_NAME;
};

export function ActivityCard({
  activity,
  userId,
  shouldRenderOptionsMenu = true,
}: Props) {

  return (
    <Card className="rounded-2xl hover:shadow-md duration-200 flex flex-col h-[500px] lg:min-w-[350px]">
      <div className="relative">
        <Badge variant="tip" className="z-50">
          {activity.tips.length} {activity.tips.length > 1 ? "tips" : "tip"}
        </Badge>

        <div className="absolute bottom-4 left-4 z-50">
          {!isCreatedByCurrentUser(activity.users?.user_id ?? "", userId) ? (
            <SaveActivityButton
              userId={userId}
              activityId={activity.activity_id}
            />
          ) : null}
        </div>
        <Link
          className="group-hover:bg-red-500"
          key={activity.activity_id}
          href={`/app/activities/${activity.activity_id}`}
        >
          <img
            className="object-cover rounded-t-2xl hover:brightness-90 duration-200 w-full h-64 lg:h-52"
            src={
              activity.tips.length
                ? getSupabaseFileUrlFromRelativePath(
                    activity.tips[0].display_image_url ?? "",
                    "tips"
                  )!
                : Sample.src
            }
            alt={activity.name ?? "Activity"}
          />
        </Link>
      </div>

      <CardHeader className="max-w-[350px] flex flex-wrap overflow-hidden flex-col max-h-[300px] h-full relative">
        <div className="flex items-center gap-2">
          
          <Avatar>
            <AvatarImage
              src={
                activity.users?.profile_picture_url
                  ? getSupabaseFileUrlFromRelativePath(
                      activity.users.profile_picture_url,
                      "avatars"
                    )
                  : "https://github.com/shadcn.png"
              }
              alt={activity.users?.username ?? DEFAULT_USER_NAME}
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
     
          <div className="">
            <p className="text-darkGray dark:text-white/80 font-medium text-sm">
              {renderCurrentUserString(
                activity.users?.user_id!,
                activity.users?.displayName!,
                userId
              )}
            </p>
            <p className="text-slate-600 dark:text-white/60 text-sm">
              {handleDateConversion(activity.created_at)}
            </p>
          </div>
          
        </div>
        

        <CardTitle className="leading-normal pt-2 text-mainBlack dark:text-white max-w-[250px] lg:max-w-[400px]">
          {activity.name}
        </CardTitle>

        <div className="flex items-center">
          <div className="absolute right-4 bottom-4">
            <RatingReadOnly
              average={activity.average_rating[0].avg}
              count={activity.ratings_count[0].count}
            />
          </div>
          {isCreatedByCurrentUser(activity.users?.user_id ?? "", userId) &&
          shouldRenderOptionsMenu ? (
            <div className="absolute left-4 bottom-4">
              <DeleteActivityDialog activityId={activity.activity_id}>
                <ActivityDropdownMenu />
              </DeleteActivityDialog>
            </div>
          ) : null}
        </div>
      </CardHeader>
    </Card>
  );
}
