"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function SavedActivitiesButtons() {
  const pathName = usePathname();

  return (
    <section className="flex gap-2 justify-center mb-12 ">
      <Button
        variant={
          pathName === "/app/saved/my-activities"
            ? "secondarySelected"
            : "secondary"
        }
        asChild
      >
        <Link href="my-activities">My Activities</Link>
      </Button>
      <Button
        variant={
          pathName === "/app/saved/activities"
            ? "secondarySelected"
            : "secondary"
        }
        asChild
      >
        <Link href="activities">Saved Activities</Link>
      </Button>
    </section>
  );
}
