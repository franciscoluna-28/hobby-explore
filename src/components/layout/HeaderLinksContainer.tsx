"use client";
import { HeaderLink } from "./HeaderLink";
import { FaBookmark } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";

export function HeaderLinksContainer() {
  return (
    <ul className="flex gap-4">
        <li>
    <HeaderLink
      ActiveLinkIcon={FaBookmark}
      InactiveLinkIcon={FaRegBookmark}
      href="/app/explore"
    >Explore</HeaderLink>
    </li>
    <li>
    <HeaderLink
      ActiveLinkIcon={FaBookmark}
      InactiveLinkIcon={FaRegBookmark}
      href="/app/my-activities"
    >ShortList</HeaderLink>
    </li>
    </ul>
    
  );
}
