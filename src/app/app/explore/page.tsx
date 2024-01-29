import React, { Suspense } from "react";
import FilterActivityButtonsSection from "@/components/activities/FilterActivityButtonsSection";
import { CreateActivityCard } from "@/components/activities/CreateActivityCard";
import { getCurrentUser } from "@/services/auth";
import { CreateActivityCardSkeleton } from "@/components/skeletons/CreateActivityCardSkeleton";

export default async function UserPage() {
  const user = await getCurrentUser();

  return (
    <>
      <FilterActivityButtonsSection />
      <section className="flex justify-center my-6 min-w-full">
        <Suspense fallback={<CreateActivityCardSkeleton/>}>
          <CreateActivityCard
          />
        </Suspense>
      </section>
    </>
  );
}
