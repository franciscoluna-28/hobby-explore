import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex max-w-[900px] w-full justify-center flex-col items-center">
      <Skeleton className="w-64 h-4 mr-auto"></Skeleton>
      <div className="flex w-full mt-4 gap-4 items-center">
        <Skeleton className="w-16 h-16 rounded-full"></Skeleton>
        <div className="flex flex-col gap-2">
          <Skeleton className="w-64 rounded-full h-4"> </Skeleton>
          <Skeleton className="w-64 rounded-full h-4"> </Skeleton>
        </div>
      </div>
      <div className="mr-auto flex flex-col w-full">
      <Skeleton className="mt-4 w-72 h-8"></Skeleton>
      <Skeleton className="mt-4 w-80 h-4"></Skeleton>
        <div className="flex gap-8 mt-8 flex-wrap">
            <Skeleton className="w-[350px] h-64"></Skeleton>
            <Skeleton className="w-[350px] h-64"></Skeleton>
            <Skeleton className="w-[150px] h-64"></Skeleton>
        </div>
      </div>
    </div>
  );
}
