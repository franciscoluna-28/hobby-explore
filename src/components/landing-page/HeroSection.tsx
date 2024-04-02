import { DEFAULT_ACTIVITIES } from "@/data/DefaultActivities";
import { ActivityCardReadOnly } from "@/components/activities/ActivityCardReadOnly";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const randomIndex = Math.floor(Math.random() * DEFAULT_ACTIVITIES.length);

  return (
    <section className="flex flex-col md:flex-row gap-16 mt-16 lg:justify-between w-full max-w-[1100px] px-8">
      <div className="lg:max-w-[600px] mr-auto">
        <h1 className="font-semibold text-6xl leading-normal text-mainBlack">
          Find your New Hobbies Today
        </h1>
        <p className="text-mainBlack/80 text-[18px] mt-8">
          Discover exciting pastimes, connect with fellow enthusiasts, and grow
          personally. Welcome to&nbsp;Hobby Explore, your gateway to a vibrant
          world of hobbies and innovation.
        </p>
        <Button className="mt-12">Try it for free</Button>
      </div>
      <div>
        <div className="relative h-full hidden md:block" suppressHydrationWarning>
          <ActivityCardReadOnly activity={DEFAULT_ACTIVITIES[randomIndex]} />
        </div>
      </div>
    </section>
  );
}
