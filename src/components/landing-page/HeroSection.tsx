import { DEFAULT_ACTIVITIES } from "@/data/DefaultActivities";
import { ActivityCardReadOnly } from "@/components/activities/ActivityCardReadOnly";
import { Button } from "@/components/ui/button";
import Decoration from "../../../public/line-1.svg";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const randomIndex = Math.floor(Math.random() * DEFAULT_ACTIVITIES.length);

  return (
    <section
      className="relative flex flex-col md:flex-row gap-16 mt-8 lg:mt-16 lg:justify-between w-full max-w-[1100px] p-8"
      id="hero"
    >
      <Image
        className="absolute invisible lg:visible lg:translate-x-[400px] rotate-12 translate-y-6"
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
          Tired of the same boring hobbies? Welcome to&nbsp;Hobby Explore, your
          gateway to a vibrant world of hobbies and innovation where you'll be
          able to share your passions with other people and connect together.
        </p>
        <Button className="mt-8" asChild>
          <Link href="/app/explore">Try it for free</Link>
        </Button>
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
