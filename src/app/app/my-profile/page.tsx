import { EmailCard } from "@/components/profile/EmailCard";
import { HomeCard } from "@/components/profile/HomeCard";
import { JoinedCard } from "@/components/profile/JoinedCard";
import { ProfileEditButtonsSection } from "@/components/profile/containers/ProfileEditButtonsSection";
import { ProfileHeroSection } from "@/components/profile/containers/ProfileHeroSection";
import { getCurrentUser } from "@/services/auth";
import { Toaster } from "sonner";
import { IoSettingsOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default async function Profile() {
  const user = await getCurrentUser();

  return (
    <>
      <Toaster richColors />
      <div className="flex flex-col">
        <ProfileHeroSection
          displayName={user?.displayName ?? ""}
          defaultProfilePictureUrl={user?.profile_picture_url ?? ""}
          defaultBannerPictureUrl={user?.banner_picture_url ?? ""}
          description={user?.description ?? ""}
        />

        <ProfileEditButtonsSection
          userId={user?.user_id ?? ""}
          defaultDescription={user?.description ?? ""}
        />

        <section className="flex flex-wrap min-w-full justify-center gap-4 mt-8">
          <EmailCard email={user?.email ?? ""} />
          <HomeCard location={user?.location} />
          <JoinedCard createdAt={user?.created_at} />
        </section>

        <section className="justify-center flex pt-8 gap-2 items-center">
          <Button className="flex gap-2 rounded-[36px]" variant="secondary">
            <IoSettingsOutline />{" "}
            <Link href="/app/my-profile/settings">Settings</Link>
          </Button>
        </section>
      </div>
    </>
  );
}
