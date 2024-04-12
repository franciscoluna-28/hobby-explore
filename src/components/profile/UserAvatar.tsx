import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

export function UserAvatar({
  profilePictureUrl,
  shouldBeGuestUser = false,
  shouldHaveLink = false,
}: {
  profilePictureUrl?: string | null;
  shouldBeGuestUser?: boolean;
  shouldHaveLink?: boolean;
}) {
  if (shouldBeGuestUser) {
    return (
      <Avatar>
        <AvatarImage src={"https://github.com/shadcn.png"} alt="User" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    );
  }

  function AvatarSection({
    profilePictureUrl,
  }: {
    profilePictureUrl?: string | null;
  }) {
    return (
      <Avatar className="cursor-pointer">
        <AvatarImage
          className="cursor-pointer"
          src={
            profilePictureUrl !== "" && profilePictureUrl
              ? getSupabaseFileUrlFromRelativePath(profilePictureUrl, "avatars")
              : "https://github.com/shadcn.png"
          }
          alt="User"
        />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    );
  }

  if (shouldHaveLink) {
    return (
      <Link href="/app/my-profile">
        <AvatarSection profilePictureUrl={profilePictureUrl} />
      </Link>
    );
  }

  return <AvatarSection profilePictureUrl={profilePictureUrl} />;
}
