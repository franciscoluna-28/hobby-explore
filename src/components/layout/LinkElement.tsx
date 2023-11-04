import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  children: React.ReactElement;
  isActive?: boolean;
  href: string;
};

export function LinkElement({ title, children, isActive, href }: Props) {
  return (
    <div className="relative h-full flex items-center group">
      <Link
        className={cn(
          "!text-mainBlack/30 text-normal relative font-bold flex gap-2 items-center",
          { "!text-white": isActive }
        )}
        href={href}
      >
        {children} {title}
      </Link>
      <div className="absolute h-[2px] w-full bottom-0 bg-transparent group-hover:bg-white duration-200"></div>
    </div>
  );
}
