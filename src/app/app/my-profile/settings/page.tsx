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
import { ActivityMotion } from "@/components/motion/ActivityMotion";

export default async function UserProfileSettings() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <ActivityMotion>
        <div className="m-auto flex justify-center flex-col items-center my-16 gap-3 max-w-[1000px]">
          <h4 className="font-bold text-mainBlack my-3 text-4xl">
            Unauthorized
          </h4>
          <div className="flex flex-col">
            <span className="text-slate-500 block text-center">
              You need to create an account before customizing your profile
              settings!
            </span>

            <div className="flex gap-4 items-center m-auto mt-4">
              <Button className="my-2" asChild>
                <Link className="" href={"/register"}>
                  Create a new account
                </Link>
              </Button>
              <Button variant="ghost" className="my-2" asChild>
                <Link
                  className="text-mainGreen font-medium"
                  href={"/app/explore"}
                >
                  Go to feed
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </ActivityMotion>
    );
  }

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
          defaultUsername={user?.username ?? ""}
        />
        <ChangeDisplayNameModal
          userId={user?.user_id ?? ""}
          defaultDisplayName={user?.displayName ?? ""}
        />

        <ChangeHomeModal
          defaultHome={user?.location ?? ""}
          userId={user?.user_id ?? ""}
        />

   {/*      <ThemeSwitch /> */}

        <LogoutModal />
      </div>
    </div>
  );
}
