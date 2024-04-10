import { DEFAULT_ACTIVITIES } from "@/data/DefaultActivities";
import { ActivityCardReadOnly } from "@/components/activities/ActivityCardReadOnly";
import { Button } from "@/components/ui/button";
import Decoration from "../../../public/line-1.svg";
import Image from "next/image";

export function HeroSection() {
  const randomIndex = Math.floor(Math.random() * DEFAULT_ACTIVITIES.length);

  return (
    <section className="relative flex flex-col md:flex-row gap-16 mt-16 lg:justify-between w-full max-w-[1100px] p-8">
      <Image
        className="absolute translate-x-[400px] rotate-12 translate-y-6 opacity-0 lg:opacity-100"
        alt="Decoration"
        src={Decoration}
        width={200}
        height={200}
      ></Image>
      <div className="lg:max-w-[600px] mr-auto">
        <h1 className="font-semibold text-6xl leading-normal text-mainBlack dark:text-white">
          Find your New Hobbies Today
        </h1>
        <p className="text-mainBlack/80 text-[18px] mt-4 dark:text-white/60">
          Discover exciting pastimes, connect with fellow enthusiasts, and grow
          personally. Welcome to&nbsp;Hobby Explore, your gateway to a vibrant
          world of hobbies and innovation.
        </p>
        <Button className="mt-8">Try it for free</Button>
      </div>
      <div>
        <div
          className="relative h-full hidden md:block"
          suppressHydrationWarning
        >
          <ActivityCardReadOnly activity={DEFAULT_ACTIVITIES[randomIndex]} />
        </div>
      </div>
    </section>
  );
}
