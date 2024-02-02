"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";
import { FilterActivityButton } from "./FilterActivityButton";
import { ExistingActivityCategories } from "@/constants/activities/categories";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

// TODO: DEAL WITH THE NO EXISTING CATEGORIES CASES AND USE A DEFAULT VALUE FOR THEM
// TODO: PERSIST THE STATE GLOBALLY SOMEHOW USING THE URL QUERY PARAMS
const FilterActivityButtonsSection: React.FC = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") as
    | ExistingActivityCategories
    | undefined;

  return (
    <div
      className="gap-2 
     overflow-x-scroll w-screen flex px-8 scrollbar-hide sm:justify-center sm:w-full sm:px-0 overflow-auto sm:overflow-hidden sm:flex sm:flex-wrap"
    >
      <Link href={`explore`}>
        <Button
          key="All"
          variant={
            selectedCategory === null ? "secondarySelected" : "secondary"
          }
          disabled={(selectedCategory as ExistingActivityCategories) === null}
        >
          All
        </Button>
      </Link>

      {Object.entries(ACTIVITIES_CATEGORIES).map(([activity, index]) => (
        <Link href={`?category=${activity}`} key={activity}>
          <FilterActivityButton
            activity={activity}
            disabled={
              (activity as ExistingActivityCategories | null) ===
              selectedCategory
            }
            selected={selectedCategory === activity}
          />
        </Link>
      ))}
    </div>
  );
};

export default FilterActivityButtonsSection;
