import { useState, useEffect } from "react";
import {
  ActivityQueryResponse,
  getTenRandomActivities,
} from "@/services/activities/getActivities";
import { useActivityStore } from "@/store/useCategoryStore";
import { ExistingActivityCategories } from "@/constants/activities/categories";

export function useGetActivities() {
  const activityCategory = useActivityStore((state) => state.currentCategory);
  const [activities, setActivities] = useState<ActivityQueryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Not a big fan of this useEffect but it works for now
  useEffect(() => {
    async function fetchActivities(categoryName?: ExistingActivityCategories | null) {
      setIsLoading(true);
      try {

        const response = await getTenRandomActivities(categoryName);

        if (response === null) {
          return null;
        }

        if ("code" in response) {
          return null;
        }

        const activities = response as ActivityQueryResponse[];

        console.log(activities)

        setActivities(activities || []);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching activities:", error);
        setIsLoading(false);
      }
    }

    const categoryName = activityCategory ? activityCategory : null;

    fetchActivities(categoryName);
  }, [activityCategory]);

  return { activities, isLoading };
}
