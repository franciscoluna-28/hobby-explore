import React, { Suspense } from "react";
import FilterActivityButtonsSection from "@/components/activities/FilterActivityButtonsSection";
import { CreateActivityCard } from "@/components/activities/CreateActivityCard";

import { CreateActivityCardSkeleton } from "@/components/skeletons/CreateActivityCardSkeleton";
import { ActivitiesFeed } from "@/components/activities/containers/ActivitiesFeed";

export default async function UserPage() {
  return (
    <>
      <FilterActivityButtonsSection />
      <section className="w-full my-6 m-auto max-w-[1000px]">
        <Suspense fallback={<CreateActivityCardSkeleton />}>
          <CreateActivityCard />
        </Suspense>
      </section>
      <ActivitiesFeed />
    </>
  );
}
