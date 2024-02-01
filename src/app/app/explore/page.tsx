import React, { Suspense } from "react";
import FilterActivityButtonsSection from "@/components/activities/FilterActivityButtonsSection";
import { CreateActivityCard } from "@/components/activities/CreateActivityCard";
import { getCurrentUser } from "@/services/auth";
import { CreateActivityCardSkeleton } from "@/components/skeletons/CreateActivityCardSkeleton";
import { getTenRandomActivities } from "@/services/activities/getActivities";
import { toast } from "sonner";
import { ActivitiesFeed } from "@/components/activities/containers/ActivitiesFeed";

export default async function UserPage() {
  return (
    <>
      <FilterActivityButtonsSection />
      <section className="flex justify-center my-6 min-w-full">
        <Suspense fallback={<CreateActivityCardSkeleton />}>
          <CreateActivityCard />
        </Suspense>
      </section>
      <ActivitiesFeed />
    </>
  );
}
