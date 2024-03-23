import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { LoadingIcon } from "../ui/LoadingIcon";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function checkProfilePictureIsNotEmpty(url: string) {
  const DEFAULT_URL = "https://github.com/shadcn.png";
  if (url === "") return DEFAULT_URL;

  return getSupabaseFileUrlFromRelativePath(url ?? "", "avatars");
}

type Props = {
  profilePictureUrl: string;
  isUploadingProfile: boolean;
};

export function ProfileAvatar({
  profilePictureUrl,
  isUploadingProfile,
}: Props) {
  return (
    <div className="z-50 relative mt-16">
      <Avatar className="rounded-full w-36 h-36 border-4 border-white">
        <AvatarImage
          src={checkProfilePictureIsNotEmpty(profilePictureUrl)}
          alt="@shadcn"
        />
        <AvatarFallback>Avatar</AvatarFallback>
      </Avatar>
      {isUploadingProfile ? (
        <div className="z-[100] text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <LoadingIcon />
        </div>
      ) : null}
    </div>
  );
}
