"use client";

import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  bannerPictureUrl: string;
  isUploadingBanner: boolean;
};

export function ProfileBanner({ bannerPictureUrl, isUploadingBanner }: Props) {
  return (
    <div className="min-w-full flex">
      <img
        alt="Profile Banner"
        src={getSupabaseFileUrlFromRelativePath(
          bannerPictureUrl ?? "",
          "banners"
        )}
        className="min-w-full h-44 object-cover absolute rounded-[36px]"
      ></img>
    </div>
  );
}
