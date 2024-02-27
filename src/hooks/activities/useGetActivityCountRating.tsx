import {
  getExactRatingCountInActivityAction,
} from "@/actions/activity/rate";
import { Tables } from "@/lib/database";
import { useQuery } from "@tanstack/react-query";

type UseGetActivityRatingProps = {
  activityId: Tables<"activities_rating">["activity_id"];
};

export function useGetActivityCountRating({ activityId }: UseGetActivityRatingProps) {
  // Activity initial rating
  const {
    isLoading: isInitialDataLoading,
    isError: isInitialDataError,
    error: initialDataError,
    data: initialData,
  } = useQuery({
    queryKey: ["ratingCount", { activityId: activityId }],
    queryFn: () => getExactRatingCountInActivityAction(activityId!),
  });

  return {
    isInitialDataError,
    isInitialDataLoading,
    initialData,
    initialDataError,
  };
}
