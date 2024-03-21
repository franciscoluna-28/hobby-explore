import { LogoutModal } from "@/components/profile/LogoutModal";
import { ChangeUserNameModal } from "@/components/profile/ChangeUsernameModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/services/auth";
import Link from "next/link";
import { ChangeDisplayNameModal } from "@/components/profile/ChangeDisplayNameModal";
import ThemeSwitch from "@/components/ui/theme-switcher";
import { ChangeHomeModal } from "@/components/profile/ChangeHomeModal";
import { ChevronLeft } from "lucide-react";

export default async function UserProfileSettings() {
  const user = await getCurrentUser();

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold">Settings</h2>
      <Separator className="mt-4" />
      <div className="flex w-full flex-col gap-4 mt-4">
        <Link className="flex" href="/app/my-profile">
          <ChevronLeft className="h-6 w-6" />{" "}
          <span className="font-medium text-sm items-center flex">Go Back</span>
        </Link>
        <ChangeUserNameModal
          userId={user?.user_id ?? ""}
          defaultUserUserName={user?.username ?? ""}
        />
        <ChangeDisplayNameModal
          userId={user?.user_id ?? ""}
          defaultDisplayName={user?.displayName ?? ""}
        />

        <ChangeHomeModal
          defaultDisplayName={user?.location ?? ""}
          userId={user?.user_id ?? ""}
        />

        <ThemeSwitch />

        <LogoutModal />
      </div>
    </div>
  );
}
