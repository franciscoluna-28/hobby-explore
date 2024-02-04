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
          stringToInclude="/explore"
          shouldUseInclude
        >
          Explore
        </HeaderLink>
      </li>
      <li>
        <HeaderLink
          ActiveLinkIcon={FaBookmark}
          InactiveLinkIcon={FaRegBookmark}
          shouldUseInclude
          stringToInclude="/saved"
          href="/app/saved/my-activities"
        >
          Saved
        </HeaderLink>
      </li>
    </ul>
  );
}
