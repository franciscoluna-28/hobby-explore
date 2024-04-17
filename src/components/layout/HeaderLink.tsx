"use client";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link, { LinkProps } from "next/link";
import { IconType } from "react-icons/lib";
import { LucideIcon } from "lucide-react";

const headerLinkVariants = cva(
  "flex w-full text-sm transition-all dark:text-white/90 justify-center font-medium gap-2 text-white !py-0 !my-0 items-center content-none before:absolute before:w-24 before:h-[2px]  before:bottom-0",
  {
    variants: {
      variant: {
        selected: "before:bg-white before:dark:bg-white/90",
        noSelected: "text-mainBlack before:bg-transparent opacity-50",
      },
      size: {
        default: "h-12 w-24",
        medium: "h-16 w-32",
      },
    },
    defaultVariants: {
      variant: "selected",
      size: "default",
    },
  }
);

type HeaderLinkProps = {
  LinkIcon: LucideIcon;
  href: string;
  children?: React.ReactNode;
  shouldUseInclude?: boolean;
  stringToInclude?: string;
} & LinkProps &
  VariantProps<typeof headerLinkVariants>;

// TODO: CHECK FOR EMPTY STRINGS AS WELL
export function HeaderLink({
  LinkIcon,
  href,
  variant,
  size,
  children,
  shouldUseInclude,
  stringToInclude = "",
  ...rest
}: HeaderLinkProps) {
  const pathName = usePathname();

  const isActiveLink = shouldUseInclude
    ? pathName.includes(stringToInclude)
    : pathName === href;

  const linkClassNames = cn(
    headerLinkVariants({
      variant: isActiveLink ? "selected" : "noSelected",
      size,
    })
  );

  return (
    <Link href={href} className={linkClassNames} {...rest}>
      <LinkIcon
        width={20}
        height={20}
        className={`${!isActiveLink ? "opacity-50 text-[#1e1e1e] dark:text-footerGray" : "text-white opacity-100"}`}

        strokeWidth={2}
      ></LinkIcon>
      {children}
    </Link>
  );
}
