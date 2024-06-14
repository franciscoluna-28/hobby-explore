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
import UserProfilePage from "@/components/profile/pages/UserProfilePage";

export default async function Profile() {
  const user = await getCurrentUser();

  return (
    <UserProfilePage user={user!}/>
  );
}
