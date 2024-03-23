"use client";

import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";

type Props = {
  bannerPictureUrl: string;
  isUploadingBanner: boolean;
};

function checkPictureIsNotEmpty(url: string) {
  const DEFAULT_URL = "https://images.unsplash.com/photo-1549558549-415fe4c37b60?q=80&w=1419&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
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
