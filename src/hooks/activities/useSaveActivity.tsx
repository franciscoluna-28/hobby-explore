import { Tables } from "@/lib/database";
import {
  getActivitySavedStatusAction,
  handleAddActivity,
} from "@/services/activities/activitiesServices";
import { useMutation } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";

// TODO: ADD OPTIMISTIC UPDATES
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

    onSuccess: (data) => {
      queryClient.setQueryData(
        ["saveStatus", { activityId: activityId }],
        data
      );
    },
  });

  // Activity initial save status
  const {
    isLoading: isInitialDataLoading,
    isError: isInitialDataError,
    error: initialDataError,
    data: initialData,
  } = useQuery({
    queryKey: ["saveStatus", { activityId: activityId }],
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
