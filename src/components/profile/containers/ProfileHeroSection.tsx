"use client";

import { ProfileAvatar } from "../ProfileAvatar";
import { ProfileBanner } from "../ProfileBanner";
import { ShareProfileModal } from "../ShareProfileModal";
import { useUploadContext } from "@/hooks/context/useUploadContext";

type Props = {
  displayName: string;
  description: string;
  defaultProfilePictureUrl: string;
  defaultBannerPictureUrl: string;
};

export function ProfileHeroSection({
  displayName,
  description,
  defaultBannerPictureUrl,
  defaultProfilePictureUrl,
}: Props) {
  // Access upload provider in profile page
  const { isUploadingProfilePicture, isUploadingBannerPicture } = useUploadContext();

  return (
    <section className="flex relative flex-col items-center gap-4">
      <ProfileBanner
        bannerPictureUrl={defaultBannerPictureUrl ?? ""}
        isUploadingBanner={isUploadingBannerPicture}
      />
      <ProfileAvatar
        profilePictureUrl={defaultProfilePictureUrl ?? ""}
        isUploadingProfile={isUploadingProfilePicture}
      />
      <div className="flex gap-2 items-center">
        <h2 className="font-bold text-3xl z-50 text-center">{displayName}</h2>
        <ShareProfileModal />
      </div>
      <div className="px-4">
        <p className="text-slate-600 text-center mx-4">{description}</p>
      </div>
    </section>
  );
}
