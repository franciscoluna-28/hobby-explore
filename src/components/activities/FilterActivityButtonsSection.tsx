"use client"

import React from "react";
import { Button } from "@/components/ui/button";
import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";
import { FilterActivityButton } from "./FilterActivityButton";
import { useActivityStore } from "@/store/useCategoryStore";
import { ExistingActivityCategories } from "@/constants/activities/categories";

const ALL_TEXT_VALUE = "All";

const FilterActivityButtonsSection: React.FC = () => {
  const currentCategory = useActivityStore((state) => state.currentCategory);
  const setCurrentCategory = useActivityStore(
    (state) => state.setCurrentCategory
  );
  const handleCategoryChange = (
    category: ExistingActivityCategories | null
  ) => {
    setCurrentCategory(category === currentCategory ? null : category);
  };

  return (
    <div className="flex gap-2 justify-center">
      <Button
        variant={currentCategory === null ? "secondarySelected" : "secondary"}
        onClick={() => handleCategoryChange(null)}
        disabled={currentCategory as ExistingActivityCategories === null}
        
      >
        All
      </Button>
      {Object.entries(ACTIVITIES_CATEGORIES).map(([activity]) => (
        <FilterActivityButton
          key={activity}
          activity={activity}
          disabled={activity as ExistingActivityCategories | null === currentCategory}
          selected={currentCategory === activity}
          onClick={() =>
            handleCategoryChange(activity as ExistingActivityCategories | null)
          }
        />
      ))}


    </div>
  );
};

export default FilterActivityButtonsSection;

