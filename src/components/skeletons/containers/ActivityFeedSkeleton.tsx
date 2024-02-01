import { ActivityCardSkeleton } from "../ActivityCardSkeleton";

export function ActivityFeedSkeletons() {
    return (
        <div className="flex flex-wrap gap-6 justify-center">
            {Array.from({ length: 3 }, (_, index) => (
                <ActivityCardSkeleton key={index} />
            ))}
        </div>
    );
}