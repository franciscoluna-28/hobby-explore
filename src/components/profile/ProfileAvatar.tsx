"use client";

import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { LoadingIcon } from "../ui/LoadingIcon";

type Props = {
  profilePictureUrl: string;
  isUploadingProfile: boolean;
};

export function ProfileAvatar({
  profilePictureUrl,
  isUploadingProfile,
}: Props) {
  return (
    <div className="z-50 relative mt-16">
      <img
        className="rounded-full w-36 h-36 border-white border-4"
        alt="User Avatar"
        src={getSupabaseFileUrlFromRelativePath(
          profilePictureUrl ?? "",
          "avatars"
        )}
      />
      {isUploadingProfile ? (
        <div className="z-[100] text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingIcon />
        </div>
      ) : null}
    </div>
  );
}
