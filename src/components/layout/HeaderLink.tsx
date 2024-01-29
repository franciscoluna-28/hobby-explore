"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import Link, { LinkProps } from "next/link";
import { IconType } from "react-icons/lib";

const headerLinkVariants = cva(
  "flex w-full text-sm transition-all duration-500 justify-center font-medium gap-2 text-white !py-0 !my-0 items-center content-none before:absolute before:w-24 before:h-[2px]  before:bottom-0",
  {
    variants: {
      variant: {
        selected: "before:bg-white",
        noSelected: "text-mainBlack/50 before:bg-transparent",
      },
      size: {
        default: "h-12 w-24",
      },
    },
    defaultVariants: {
      variant: "selected",
      size: "default",
    },
  }
);

type HeaderLinkProps = {
  ActiveLinkIcon: IconType;
  InactiveLinkIcon: IconType;
  children: React.ReactNode;
} & LinkProps &
  VariantProps<typeof headerLinkVariants>;

export const HeaderLink = forwardRef(function HeaderLinkComponent({
  ActiveLinkIcon,
  InactiveLinkIcon,
  href,
  variant,
  size,
  children,
  ...rest
}: HeaderLinkProps) {
  const pathName = usePathname();

  const isActiveLink = pathName === href;

  const linkClassNames = cn(
    headerLinkVariants({
      variant: isActiveLink ? "selected" : "noSelected",
      size,
    })
  );

  return (
    <Link href={href} className={linkClassNames} {...rest}>
      {isActiveLink ? <ActiveLinkIcon /> : <InactiveLinkIcon />}
      {children}
    </Link>
  );
});
