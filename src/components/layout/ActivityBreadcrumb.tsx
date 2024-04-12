"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function ActivityBreadCrumb({
  activityName,
}: {
  activityName?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className="py-4 mr-auto flex items-center">
      <ol className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400 items-center">
        <li>
          <Link
            className="text-slate-500 dark:text-white/50"
            href="/app/explore"
          >
            Home
          </Link>
        </li>
        <li>
          <ChevronRight className="w-4 h-4" />
        </li>
        <li
          aria-current="page"
          className="text-mainGreen font-medium dark:text-white"
        >
          {activityName}
        </li>
      </ol>
    </nav>
  );
}
