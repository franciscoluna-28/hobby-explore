import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { getCurrentUser } from "@/services/auth";

const getRenderText = (displayName: string | null | undefined): string => {
  return `Hey  ${
    displayName ?? "User"
  }! share some activities and tell us how to do it.`;
};

export async function CreateActivityCard() {
  const user = await getCurrentUser();

  return (
    <Card className="w-full max-w-[1080px] !border-none rounded-2xl border shadow-xl shadow-black/5">
      <CardContent className="flex items-center !p-4 gap-2">
        <Avatar key={user?.user_id}>
          <AvatarImage
            src={getSupabaseFileUrlFromRelativePath(
              user?.profile_picture_url ?? "",
              "avatars"
            )}
            alt="user"
          />
          <AvatarFallback>User</AvatarFallback>
        </Avatar>
        <p className="text-textGray">{getRenderText(user?.displayName)}</p>
      </CardContent>
    </Card>
  );
}
