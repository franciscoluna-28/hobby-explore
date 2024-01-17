import { Skeleton } from "@/components/ui/skeleton";

<div className="w-screen !m-8 flex justify-center">
<section className="flex relative flex-col items-center gap-4 m-8">
  <div className="w-flex justify-center">
    <Skeleton className="rounded-[36px] absolute w-screen h-40" />
  </div>

  <div className="z-50 relative mt-16">
    <Skeleton className="w-32 h-32 bg-slate-200 rounded-full mt-12 " />
  </div>
</section>
</div>


export default function Loading() {
  return (
    <div className="m-8 relative flex justify-center">
    <Skeleton className="h-40 rounded-[36px] absolute w-full"></Skeleton>

    <div className="flex flex-col items-center">
    <Skeleton className="rounded-full mt-24 bg-slate-200 w-32 h-32"></Skeleton>
    <Skeleton className="h-10 w-52 mt-6 rounded-[36px]"></Skeleton>
    <Skeleton className="h-6 w-64 mt-6 rounded-[36px]"></Skeleton>
    <Skeleton className="h-10 w-72 mt-6 rounded-[36px]"></Skeleton>

    <div className="flex flex-wrap gap-4 mt-8">
    <Skeleton className="h-20 w-72 mt-6 rounded-[36px]"></Skeleton>
    <Skeleton className="h-20 w-72 mt-6 rounded-[36px]"></Skeleton>
    <Skeleton className="h-20 w-72 mt-6 rounded-[36px]"></Skeleton>
    </div>
    </div>
    </div>
  );
}
