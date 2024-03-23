import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="max-w-[500px] min-w-full flex flex-col gap-8 min-h-screen p-8">
      <Skeleton className="h-32 min-w-[400px] rounded-[16px]"></Skeleton>
      <Skeleton className="h-16 min-w-[400px] rounded-[16px]"></Skeleton>
      <Skeleton className="h-16 min-w-[400px] rounded-[16px]"></Skeleton>
      <Skeleton className="h-16 min-w-[400px] rounded-[16px]"></Skeleton>
      <Skeleton className="h-16 min-w-[400px] rounded-[16px]"></Skeleton>
    </div>
  );
}
