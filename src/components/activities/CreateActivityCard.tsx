import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { getCurrentUser } from "@/services/auth";
import { Plus } from "lucide-react";
import Link from "next/link";

const getRenderText = (displayName: string | null | undefined): string => {
  return `Hey  ${
    displayName !== "" ? displayName : `user`
  }! share some activities and tell us how to do it.`;
};

export async function CreateActivityCard() {
  const user = await getCurrentUser();

  return (
    <Link href="/app/create">
      <Card className="transition-all !w-full rounded-2xl border border-slate-200/50 shadow-sm hover:shadow-md duration-200 shadow-black/5">
        <CardContent className="flex items-center !p-4 gap-2">
          <Avatar key={user?.user_id}>
            <AvatarImage
              src={
                user?.profile_picture_url !== "" && user?.profile_picture_url
                  ? getSupabaseFileUrlFromRelativePath(
                      user?.profile_picture_url ?? "",
                      "avatars"
                    )
                  : "https://github.com/shadcn.png"
              }
              alt="User"
            />
            <AvatarFallback>User</AvatarFallback>
          </Avatar>
          <p className="text-textGray">{getRenderText(user?.displayName)}</p>
          <div className="ml-auto bg-mainGreen p-1 rounded-full text-white">
            <Plus className="text-white" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
