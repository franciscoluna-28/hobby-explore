import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { handleDateConversion } from "@/lib/dates/dateConversion";

import { ActivityPreview } from "@/data/DefaultActivities";
import { SaveActivityButtonReadOnly } from "./SaveActivityButtonReadOnly";
import { RatingReadOnlyLandingPage } from "../rating/RatingLandingPage";

type ActivityCardReadOnlyProps = {
  activity: ActivityPreview;
};

export function ActivityCardReadOnly({ activity }: ActivityCardReadOnlyProps) {
  return (
    <Card className="rounded-2xl hover:shadow-md duration-200 w-[350px] h-[500px] shadow-md">
      <div className="relative">
        <Badge variant="tip">
          {activity.tipsNumber} {activity.tipsNumber > 1 ? "tips" : "tip"}
        </Badge>

        <div className="absolute bottom-4 left-4 z-50">
          <SaveActivityButtonReadOnly activity={activity} />
        </div>

        <img
          className="object-cover rounded-t-2xl w-full h-[200px]"
          src={activity.firstTipImageUrl}
          alt={activity.name ?? "Activity"}
        />
      </div>

      <CardHeader className="max-w-[350px] flex flex-wrap overflow-hidden flex-col max-h-[300px] h-full relative">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={activity.user.profilePictureUrl} />
            <AvatarFallback>{activity.user.displayName}</AvatarFallback>
          </Avatar>
          <div className="">
            <p className="text-darkGray font-medium text-sm dark:text-white/80">
              {activity.user.displayName}
            </p>
            <p className="text-slate-600 text-sm dark:text-white/60">
              {handleDateConversion(activity.created_at)}
            </p>
          </div>
        </div>

        <CardTitle className="leading-normal pt-2 text-mainBlack dark:text-white">
          {activity.name}
        </CardTitle>
        <div className="absolute right-4 bottom-4">
          <RatingReadOnlyLandingPage
            ratingAverage={activity.ratingAverage}
            ratingCount={activity.ratingCount}
          />
        </div>
      </CardHeader>
    </Card>
  );
}
