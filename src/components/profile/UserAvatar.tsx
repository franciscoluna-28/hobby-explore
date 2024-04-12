import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function UserAvatar({
  profilePictureUrl,
  shouldBeGuestUser = false,
}: {
  profilePictureUrl?: string | null;
  shouldBeGuestUser?: boolean;
}) {
  if (shouldBeGuestUser) {
    return (
      <Avatar>
        <AvatarImage src={"https://github.com/shadcn.png"} alt="User" />
        <AvatarFallback>User</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className="cursor-pointer">
      <AvatarImage className="cursor-pointer"
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
