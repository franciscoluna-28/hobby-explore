"use client";

import { useAuth } from "@/store/useAuthStore";
import { ProfileAvatar } from "../ProfileAvatar";
import { ProfileBanner } from "../ProfileBanner";
import { ShareProfileModal } from "../ShareProfileModal";
import { useUploadContext } from "@/hooks/context/useUploadContext";
import { useEffect } from "react";

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
  const setProfilePictureUrl = useAuth((state) => state.setUserProfilePhotoUrl);
  const setBannerPictureUrl = useAuth((state) => state.setUserBannerPhotoUrl);
  const profilePictureUrl = useAuth((state) => state.userProfilePhoto);
  const bannerPictureUrl = useAuth((state) => state.userBannerProfilePhoto);
  const userDescription = useAuth((state) => state.userDescription);
  const setUserDescription = useAuth((state) => state.setUserDescription);
  const setUserDisplayName = useAuth((state) => state.setDisplayName);
  const userDisplayName = useAuth((state) => state.displayName);

  // The effects are used to avoid infinite renders and to change the pictures dinamically
  useEffect(() => {
    setProfilePictureUrl(defaultProfilePictureUrl);
  }, [setProfilePictureUrl]);

  useEffect(() => {
    setBannerPictureUrl(defaultBannerPictureUrl);
  }, [setBannerPictureUrl]);

  useEffect(() => {
    setUserDescription(description);
  }, [setUserDescription]);

  useEffect(() => {
    setUserDisplayName(displayName);
  }, [setUserDisplayName]);

  // Access upload provider in profile page
  const { isUploadingProfile, isUploadingBanner } = useUploadContext();

  return (
    <section className="flex relative flex-col items-center gap-4">
      <ProfileBanner
        bannerPictureUrl={bannerPictureUrl ?? ""}
        isUploadingBanner={isUploadingBanner}
      />
      <ProfileAvatar
        profilePictureUrl={profilePictureUrl ?? ""}
        isUploadingProfile={isUploadingProfile}
      />
      <div className="flex gap-2 items-center">
        <h2 className="font-bold text-3xl z-50 text-center">{userDisplayName}</h2>
        <ShareProfileModal />
      </div>
      <div className="px-4">
      <p className="text-slate-600 text-center mx-4">{userDescription}</p>
      </div>
    </section>
  );
}
