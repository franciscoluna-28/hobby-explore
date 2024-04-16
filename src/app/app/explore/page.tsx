import React, { Suspense } from "react";
import FilterActivityButtonsSection from "@/components/activities/FilterActivityButtonsSection";
import { CreateActivityCard } from "@/components/activities/CreateActivityCard";
import { CreateActivityCardSkeleton } from "@/components/skeletons/CreateActivityCardSkeleton";
import { ActivitiesFeed } from "@/components/activities/containers/ActivitiesFeed";
import { ActivitiesPagination } from "@/components/pagination/ActivitiesPagination";
import { getCurrentUser } from "@/services/auth";

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getCurrentUser();

  return (
    <>
      <div className="!text-left flex mb-6 mr-auto sm:hidden ">
        <h3 className="font-semibold text-2xl mr-auto">Explore</h3>
      </div>
      <FilterActivityButtonsSection />
      <section className="w-full my-6 m-auto">
        <Suspense fallback={<CreateActivityCardSkeleton />}>
          <CreateActivityCard user={user} />
        </Suspense>
      </section>
      <ActivitiesFeed userId={user?.user_id ?? ""} />
      <ActivitiesPagination searchParams={searchParams} />
    </>
  );
}
