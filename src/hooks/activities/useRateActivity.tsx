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
    onMutate: async (newRating) => {
      // Cancel any outgoing fetching requests (so they don't overwrite the optimistic update)
      await queryClient.cancelQueries({
        queryKey: ["rating", { activityId: activityId }],
      });

      // Snapshot the previous value
      const previousRating = queryClient.getQueryData([
        "rating",
        { activityId: activityId },
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["rating", { activityId: activityId }],
        (old) => [old, newRating]
      );

      // Return a context object with the snapshotted value
      return { previousRating };
    },
    onError: (_, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(
        ["rating", { activityId: activityId }],
        context?.previousRating
      );
    },
    onSettled: () => {
      // Always refetch after error or success:
      queryClient.invalidateQueries({
        queryKey: ["rating", { activityId: activityId }],
      });
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
    initialData: initialData as number[] | number,
    initialDataError,
  };
}
