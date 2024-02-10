import { LogoutModal } from "@/components/profile/LogoutModal";
import { ChangeUserNameModal } from "@/components/profile/ChangeUsernameModal";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getCurrentUser } from "@/services/auth";
import Link from "next/link";
import { ChangeDisplayNameModal } from "@/components/profile/ChangeDisplayNameModal";

export default async function UserProfileSettings() {
  const user = await getCurrentUser();

  return (
    <div>
      <h2 className="text-2xl font-semibold">User Profile Settings</h2>
      <Separator className="mt-4" />
      <div className="flex w-min flex-col gap-4 mt-4">
        <Button asChild className="w-min rounded-[36px]">
          <Link href="/app/my-profile">Go Back</Link>
        </Button>
        <ChangeUserNameModal
          userId={user?.user_id ?? ""}
          defaultUserUserName={user?.username ?? ""}
        />
        <ChangeDisplayNameModal
          userId={user?.user_id ?? ""}
          defaultDisplayName={user?.displayName ?? ""}
        />
        <LogoutModal />
      </div>
    </div>
  );
}
