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
import { Tables } from "@/lib/database";
import { RatingReadOnly } from "../rating/RatingOnlyRead";
import { MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {
  activity: ActivityQueryResponse;
  userId?: Tables<"users">["user_id"];
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
    return `You`;
  }

  return activityUserDisplayName;
};

const DEFAULT_USER_NAME = "Shadcn";

// TODO: IF THE ACTIVITY IS FROM THE SAME USER, DISPLAY A MENU TO SEE DELETE AND READ OPERATIONS. FOR EXAMPLE, A USER CAN GO TO THE ACTIVITY FORM AND EDIT THE INFORMATION OR DELETE THE ACTIVITY
// TODO: USERS AREN'T ABLE TO SAVE THEIR OWN ACTIVITIES. ONLY ACTIVITIES FROM OTHER USERS. THAT'S WHY THE ACTIVITIES THEY HAVE CREATED HAVE A SPECIFIC UI SECTION. ALSO, AVOID USERS FROM SAVING THEIR OWN ACTIVITIES SERVER SIDE
// TODO: ADD BLUR EFFECT TO IMAGES WHEN THEY'RE LOADING
export function ActivityCard({ activity, userId }: Props) {
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
                ? getSupabaseFileUrlFromRelativePath(
                    activity.tips[0].display_image_url ?? "",
                    "tips"
                  )!
                : Sample.src
            }
            alt={activity.name ?? "Activity"}
          />
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
              <p className="text-darkGray font-medium text-sm">
                {renderCurrentUserString(
                  activity.users?.user_id!,
                  activity.users?.displayName!,
                  userId
                )}
              </p>
              <p className="text-slate-600 text-sm">
                {handleDateConversion(activity.created_at)}
              </p>
            </div>
          </div>
          <Link
            className=""
            key={activity.activity_id}
            href={`/app/activities/${activity.activity_id}`}
          >
            <CardTitle className="leading-normal pt-2 text-mainBlack ">
              {activity.name}
            </CardTitle>
          </Link>
          <div className="flex items-center">
            <div className="absolute right-4 bottom-4">
              <RatingReadOnly activityId={activity.activity_id} />
            </div>
            <div className="absolute left-4 bottom-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-white !p-0 w-8 h-8 hover:bg-white border rounded-full">
                    <MoreHorizontal className="w-6 h-6 text-slate-300" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>
                      Profile
                      <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Billing
                      <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Settings
                      <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Keyboard shortcuts
                      <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Team</DropdownMenuItem>
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger>
                        Invite users
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                          <DropdownMenuItem>Email</DropdownMenuItem>
                          <DropdownMenuItem>Message</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>More...</DropdownMenuItem>
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                    <DropdownMenuItem>
                      New Team
                      <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>GitHub</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuItem disabled>API</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    Log out
                    <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>
      </Card>
    </li>
  );
}
