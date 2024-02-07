import { ActivityQueryResponse } from "@/services/activities/getActivities";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { handleDateConversion } from "@/lib/dates/dateConversion";
import { SaveActivityButton } from "./SaveActivityButton";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import Sample from "../../../public/sample.jpg";

type Props = {
  activity: ActivityQueryResponse;
};

// TODO: ASK FOR THE CURRENT AUTHENTICATED USER TO SEE IF THE ACTIVITY IS FROM THE CURRENT USER AND DISPLAY (YOU) (OPTIONAL)
// TODO: IF THE ACTIVITY IS FROM THE SAME USER, DISPLAY A MENU TO SEE DELETE AND READ OPERATIONS. FOR EXAMPLE, A USER CAN GO TO THE ACTIVITY FORM AND EDIT THE INFORMATION OR DELETE THE ACTIVITY
// TODO: USERS AREN'T ABLE TO SAVE THEIR OWN ACTIVITIES. ONLY ACTIVITIES FROM OTHER USERS. THAT'S WHY THE ACTIVITIES THEY HAVE CREATED HAVE A SPECIFIC UI SECTION. ALSO, AVOID USERS FROM SAVING THEIR OWN ACTIVITIES SERVER SIDE
// TODO: ADD BLUR EFFECT TO IMAGES WHEN THEY'RE LOADING
// TODO: FIX GLOBAL OVERFLOW-X ISSUE ON MOBILE DEVICES
export function ActivityCard({ activity }: Props) {
  return (
    <li>
      <Card className="rounded-2xl hover:shadow-md duration-200 w-[350px] h-[500px]">
        <div className="relative">
          <Badge className="absolute top-4 right-4 bg-mainBlack/60">
            {activity.tips.length} {activity.tips.length > 1 ? "tips" : "tip"}
          </Badge>

          <div className="absolute bottom-4 left-4 z-50">
            <SaveActivityButton activityId={activity.activity_id} />
          </div>

          <img
            className="object-cover rounded-t-2xl w-full h-[200px]"
            src={
              activity.tips.length
                ? getSupabaseFileUrlFromRelativePath(activity.tips[0].display_image_url, "tips")!
                : Sample.src
            }
            alt={activity.name ?? "Activity"}
          />
        </div>
        <Link
          className="w-min bg-red-500"
          key={activity.activity_id}
          href={`activities/${activity.activity_id}`}
        >
          <CardHeader className="max-w-[350px] flex flex-wrap overflow-hidden flex-col">
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
                  alt={activity.users?.username ?? "@shadn"}
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
            <CardTitle className="leading-normal pt-2 text-mainBlack ">
              {activity.name}
            </CardTitle>
          </CardHeader>
        </Link>
      </Card>
    </li>
  );
}
