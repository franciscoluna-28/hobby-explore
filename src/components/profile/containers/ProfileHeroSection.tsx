"use client";

import { ChangeUserNameModal } from "../ChangeUsernameModal";
import { ProfileAvatar } from "../ProfileAvatar";
import { ProfileBanner } from "../ProfileBanner";
import { ShareProfileModal } from "../ShareProfileModal";
import { useUploadContext } from "@/hooks/context/useUploadContext";

type Props = {
  displayName: string;
  username?: string;
  description: string;
  defaultProfilePictureUrl: string;
  defaultBannerPictureUrl: string;
};

export function ProfileHeroSection({
  displayName,
  description,
  username,
  defaultBannerPictureUrl,
  defaultProfilePictureUrl,
}: Props) {
  // Access upload provider in profile page
  const { isUploadingProfilePicture, isUploadingBannerPicture } =
    useUploadContext();

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
      <div className="flex flex-col justify-center items-center">
        <h2 className="font-bold text-3xl z-50 text-center">
          {displayName !== "" && displayName !== null ? displayName : "User"}
        </h2>
        <span className="text-slate-600 mt-4 dark:text-white/80">
          @{username}
        </span>
      </div>
      <div className="px-4">
        <p className="text-slate-600 text-center dark:text-white/50 mx-4">
          {description !== "" && description !== null
            ? description
            : "I'm new to Hobby Explore!"}
        </p>
      </div>
    </section>
  );
}
