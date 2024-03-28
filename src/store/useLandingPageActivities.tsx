import { ActivityPreview } from "@/data/DefaultActivities";
import { create } from "zustand";

type State = {
  activities: ActivityPreview[];
  addActivity: (activity: ActivityPreview) => void;
  addRating: (activityId: number, rating: number) => void;
  handleSaveActivity: (activity: ActivityPreview) => void;
  getSaveStatus: (activityId: number) => boolean;
};

const useActivityStore = create<State>((set) => ({
  activities: [],
  addActivity: (activity) =>
    set((state) => ({ activities: [...state.activities, activity] })),
  addRating: (activityId, rating) =>
    set((state) => ({
      activities: state.activities.map((act) =>
        act.activity_id === activityId
          ? {
              ...act,
              ratingCount: act.ratingCount + 1,
              ratingAverage:
                (act.ratingAverage * act.ratingCount + rating) /
                (act.ratingCount + 1),
            }
          : act
      ),
    })),
  handleSaveActivity: (activity) => {
    if (activity.activity_id === undefined) return;
    const isActivitySaved = useActivityStore
      .getState()
      .activities.some(
        (savedActivity) => savedActivity.activity_id === activity.activity_id
      );
    if (isActivitySaved) {
      set((state) => ({
        activities: state.activities.filter(
          (savedActivity) => savedActivity.activity_id !== activity.activity_id
        ),
      }));
      return;
    }
    set((state) => ({ activities: [...state.activities, activity] }));
  },
  getSaveStatus: (activityId) =>
    useActivityStore
      .getState()
      .activities.some(
        (savedActivity) => savedActivity.activity_id === activityId
      ),
}));

export default useActivityStore;
