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
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { Swiper, SwiperSlide } from "swiper/react";
import TipCarousel from "@/components/tips/TipCarousel";

// TODO: ISOLATE THE BREADCRUMB AND CREATE ITS OWN COMPONENT
function Component({ activityName }: { activityName?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="p-4 mr-auto flex items-center">
      <ol className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
        <li>
          <Link
            className="hover:text-gray-900 dark:hover:text-gray-50"
            href="/app/explore"
          >
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4 mt-[1px]" />
        </li>
        <li
          aria-current="page"
          className="text-mainGreen font-medium dark:text-gray-50"
        >
          {activityName}
        </li>
      </ol>
    </nav>
  );
}

export default async function ActivityPage({
  params,
}: {
  params: {
    activityId: string;
  };
}) {
  const activityData = await getActivityById(params.activityId);

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
    <section className="w-full m-auto flex flex-col h-full ">
      <Component activityName={activity[0].name ?? ""} />
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
            {activity[0].users?.displayName ?? "User"}
          </p>
          <p className="text-gray text-sm">
            {handleDateConversion(activity[0].created_at)}
          </p>
        </div>
      </div>
      <h2 className="text-mainBlack text-3xl font-semibold leading-normal my-3">
        {activity[0].name}
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        {activity[0].description}
      </p>
      <Badge variant="secondary" className="w-fit">
        {getCategoryNameById(activity[0].category_id)}
      </Badge>
      <TipCarousel tips={activity[0].tips} />
      <p>Max. Accessibility: {activity[0].accessibility_max_value}</p>
      <p>Min. Accessibility: {activity[0].accessibility_min_value}</p>
      <p>Participants: {activity[0].participants}</p>
    </section>
  );
}
