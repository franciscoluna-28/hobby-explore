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
import { Trash2 } from "lucide-react";
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
import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DeleteActivityDialog } from "./DeleteActivityDialog";

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

// TODO: USERS AREN'T ABLE TO SAVE THEIR OWN ACTIVITIES. ONLY ACTIVITIES FROM OTHER USERS. THAT'S WHY THE ACTIVITIES THEY HAVE CREATED HAVE A SPECIFIC UI SECTION. ALSO, AVOID USERS FROM SAVING THEIR OWN ACTIVITIES SERVER SIDE
// TODO: ADD BLUR EFFECT TO IMAGES WHEN THEY'RE LOADING
export function ActivityCard({ activity, userId, shouldRenderOptionsMenu = true }: Props) {

  return (
    <li>
      <Card className="rounded-2xl hover:shadow-md duration-200 w-[350px] h-[500px]">
        <div className="relative">
          <Badge className="absolute top-4 right-4 bg-mainBlack/60">
            {activity.tips.length} {activity.tips.length > 1 ? "tips" : "tip"}
          </Badge>

          <div className="absolute bottom-4 left-4 z-50">
            {!isCreatedByCurrentUser(activity.users?.user_id ?? "", userId) ? (
              <SaveActivityButton userId={userId} activityId={activity.activity_id} />
            ) : null}
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
            {isCreatedByCurrentUser(activity.users?.user_id ?? "", userId) && shouldRenderOptionsMenu ? (
              <div className="absolute left-4 bottom-4">
                <DeleteActivityDialog activityId={activity.activity_id}>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button className="bg-white !p-0 w-8 h-8 hover:bg-white border rounded-full">
                        <MoreHorizontal className="w-6 h-6 text-slate-300" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuLabel>More Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        <DropdownMenuItem className="text-red-500 flex gap-2 hover:bg-red-500 hover:text-white duration-200">
                          <DialogTrigger className="flex items-center gap-2">
                            Delete Activity <Trash2 className="w-4 h-4" />
                          </DialogTrigger>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                          Share Activity
                          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </DeleteActivityDialog>
              </div>
            ) : null}
          </div>
        </CardHeader>
      </Card>
    </li>
  );
}
