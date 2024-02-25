import {
  getCurrentActivityRatingAction,
  rateActivityAction,
} from "@/actions/activity/rate";
import { Tables } from "@/lib/database";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type UseRateActivityProps = {
  activityId: Tables<"activities_rating">["activity_id"];
};

export function useRateActivity({ activityId }: UseRateActivityProps) {
  const queryClient = useQueryClient();

  async function handleRateActivity(
    activityId: UseRateActivityProps["activityId"],
    rating: number
  ) {
    await rateActivityAction(activityId, rating);

    return await getCurrentActivityRatingAction(activityId);
  }

  // Updates the initial data for the rating according to the activity ID
  const mutation = useMutation({
    mutationFn: (rating: number) => handleRateActivity(activityId, rating),
    onSuccess: (data) => {
      queryClient.setQueryData(["rating", { activityId: activityId }], data);
    },
  });

  // Activity initial rating
  const {
    isLoading: isInitialDataLoading,
    isError: isInitialDataError,
    error: initialDataError,
    data: initialData,
  } = useQuery({
    queryKey: ["rating", { activityId: activityId }],
    queryFn: () => getCurrentActivityRatingAction(activityId!),
  });

  return {
    mutation,
    isInitialDataError,
    isInitialDataLoading,
    initialData,
    initialDataError,
  };
}
