"use client";

import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  bannerPictureUrl: string;
  isUploadingBanner: boolean;
};

function checkPictureIsNotEmpty(url: string) {
  const DEFAULT_URL = "https://placehold.co/1200x400?text=Banner";
  if (url === "") return DEFAULT_URL;

  return getSupabaseFileUrlFromRelativePath(url, "banners");
}

export function ProfileBanner({ bannerPictureUrl }: Props) {
  return (
    <div className="min-w-full flex">
      <img
        alt="Profile Banner"
        src={checkPictureIsNotEmpty(bannerPictureUrl)}
        className="min-w-full h-44 object-cover absolute rounded-[36px]"
      ></img>
    </div>
  );
}
