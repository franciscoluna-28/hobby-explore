import { useState, useEffect } from "react";
import {
  ActivityQueryResponse,
  getTenRandomActivities,
} from "@/services/activities/getActivities";
import { useActivityStore } from "@/store/useCategoryStore";

export function useGetActivities() {
  const activityCategory = useActivityStore((state) => state.currentCategory);
  const [activities, setActivities] = useState<ActivityQueryResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Not a big fan of this useEffect but it works for now
  useEffect(() => {
    async function fetchActivities(categoryId?: string | null) {
      setIsLoading(true);
      try {

        console.log(categoryId)

        const response = await getTenRandomActivities(categoryId);

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

    const categoryId = activityCategory ? activityCategory : null;

    fetchActivities(categoryId);
  }, [activityCategory]);

  return { activities, isLoading };
}
