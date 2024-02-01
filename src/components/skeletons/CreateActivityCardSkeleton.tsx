import { ActivityMotion } from "../motion/ActivityMotion";
import { Skeleton } from "../ui/skeleton";

export function CreateActivityCardSkeleton() {
  return (
  
    <ActivityMotion>
  <Skeleton className="min-w-[1080px] rounded-2xl h-[75px]"></Skeleton>
  </ActivityMotion>
  )
}
