import { useQuery } from "@tanstack/react-query";
import {
  ActivityQueryResponse,
  getTenRandomActivities,
} from "@/services/activities/getActivities";
import { useSearchParams } from "next/navigation";
import { ExistingActivityCategories } from "@/constants/activities/categories";

export function useGetActivities() {
  const searchParams = useSearchParams();
  const activityCategory = searchParams.get("category") as
    | ExistingActivityCategories
    | undefined;

  const {
    data: activities = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["activities", activityCategory],
    queryFn: async () => {
      try {
        const response = await getTenRandomActivities(activityCategory);
        if (response === null || "code" in response) {
          throw new Error("Error fetching activities");
        }
        return response as ActivityQueryResponse[];
      } catch (error) {
        throw new Error("Error fetching activities");
      }
    },
  });

  return { activities, isLoading, isError };
}
