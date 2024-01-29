import { ExistingActivityCategories } from "@/constants/activities/categories";
import { create } from "zustand";

interface ActivityStore {
  currentCategory: ExistingActivityCategories | null;
  setCurrentCategory: (category: ExistingActivityCategories | null) => void;
}

export const useActivityStore = create<ActivityStore>((set) => ({
  currentCategory: null,
  setCurrentCategory: (category: ExistingActivityCategories | null) =>
    set({ currentCategory: category }),
}));
