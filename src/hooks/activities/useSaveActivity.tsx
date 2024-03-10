import { Tables } from "@/lib/database";
import {
  getActivitySavedStatusAction,
  handleAddActivity,
} from "@/services/activities/activitiesServices";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

// Supabase state
type useSaveActivityProps = {
  activityId: Tables<"activities">["activity_id"];
};

/**
 * Custom hook to handle the functionality to save or delete one activity. Acts as a trigger
 * @param: activityId - The activity id to be saved or deleted
 * @returns - The mutation object and the initial data properties
 */
export function useSaveActivity({ activityId }: useSaveActivityProps) {
  const queryClient = useQueryClient();

  /**
   *
   * @param activityId - The activity ID to save or delete.
   * @returns - Promise<boolean> - The save status of the activity.
   */
  async function handleSaveDeleteActivity(
    activityId: number
  ): Promise<boolean> {
    await handleAddActivity(activityId);

    return await getActivitySavedStatusAction(activityId);
  }

  // Updates the initial data for the activity according to its ID
  const mutation = useMutation({
    mutationFn: (activityId: number) => handleSaveDeleteActivity(activityId),
    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: ["savedStatus", { activityId: activityId }],
      });

      // Snapshot the previous value
      const previousSavedStatus = queryClient.getQueryData([
        "savedStatus",
        { activityId: activityId },
      ]);

      // Optimistically update to the new value
      queryClient.setQueryData(
        ["savedStatus", { activityId: activityId }],
        (old) => [old, variables]
      );

      // Return a context object with the snapshotted value
      return { previousSavedStatus };
    },

    onError: (_, __, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      queryClient.setQueryData(
        ["savedStatus", { activityId: activityId }],
        context?.previousSavedStatus
      );
    },
    onSettled: () => {
      // Always refetch after error or success:
      queryClient.invalidateQueries({
        queryKey: ["savedStatus", { activityId: activityId }],
      });
    },
  });

  // Activity initial save status
  const {
    isLoading: isInitialDataLoading,
    isError: isInitialDataError,
    error: initialDataError,
    data: initialData,
  } = useQuery({
    queryKey: ["savedStatus", { activityId: activityId }],
    queryFn: () => getActivitySavedStatusAction(activityId!),
  });

  return {
    mutation,
    isInitialDataError,
    isInitialDataLoading,
    initialData,
    initialDataError,
  };
}
