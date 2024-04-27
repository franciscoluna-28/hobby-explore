import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  href: string;
  activeSection: string;
  currentSection: string;
};

export function LandingPageHeaderLink({
  children,
  currentSection,
  href,
  activeSection,
}: Props) {
  return (
    <Link
      className={`text-sm text-mainBlack/80 dark:text-white link duration-200 transition-all ${
        activeSection === currentSection && "text-mainGreen"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
