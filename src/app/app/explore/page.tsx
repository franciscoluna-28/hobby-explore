import React, { Suspense } from "react";
import FilterActivityButtonsSection from "@/components/activities/FilterActivityButtonsSection";
import { CreateActivityCard } from "@/components/activities/CreateActivityCard";
import { CreateActivityCardSkeleton } from "@/components/skeletons/CreateActivityCardSkeleton";
import { ActivitiesFeed } from "@/components/activities/containers/ActivitiesFeed";
import { ActivitiesPagination } from "@/components/pagination/ActivitiesPagination";
import { getCurrentUserId } from "@/services/auth";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const userId = await getCurrentUserId();

  return (
    <>
      <div className="!text-left flex mb-6 mr-auto sm:hidden ">
        <h3 className="font-semibold text-2xl mr-auto">Explore</h3>
      </div>
      <FilterActivityButtonsSection />
      <section className="w-full my-6 m-auto max-w-[1000px]">
        <Suspense fallback={<CreateActivityCardSkeleton />}>
          <CreateActivityCard />
        </Suspense>
      </section>
      <ActivitiesFeed userId={userId ?? ""} />
      <ActivitiesPagination searchParams={searchParams} />
    </>
  );
}
