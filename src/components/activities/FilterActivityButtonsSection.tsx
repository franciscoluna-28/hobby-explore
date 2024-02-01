"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ACTIVITIES_CATEGORIES } from "@/constants/activities/categories";
import { FilterActivityButton } from "./FilterActivityButton";
import { ExistingActivityCategories } from "@/constants/activities/categories";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const FilterActivityButtonsSection: React.FC = () => {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category") as
    | ExistingActivityCategories
    | undefined;

  return (
    <div className="flex gap-2 justify-center">
      <Link href={`explore`}>
        <Button
          variant={
            selectedCategory === null ? "secondarySelected" : "secondary"
          }
          disabled={(selectedCategory as ExistingActivityCategories) === null}
        >
          All
        </Button>
      </Link>

      {Object.entries(ACTIVITIES_CATEGORIES).map(([activity]) => (
        <Link href={`?category=${activity}`}>
          <FilterActivityButton
            key={activity}
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
