import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { getCurrentUser } from "@/services/auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateActivityModal } from "../create-activity/CreateActivityModal";

const getRenderText = (displayName: string | null | undefined): string => {
  return `Hey  ${
    displayName ?? "User"
  }! share some activities and tell us how to do it.`;
};

export async function CreateActivityCard() {
  const user = await getCurrentUser();

  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <Card className="!border-none transition-all !w-full rounded-2xl border shadow-sm hover:shadow-md duration-200 shadow-black/5">
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
            <div className="ml-auto bg-mainGreen p-1 rounded-full text-white">
              <Plus className="text-white" />
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>
      <DialogContent className="lg:max-w-screen-xl overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Share Your Activity</DialogTitle>
        </DialogHeader>
        <CreateActivityModal />

        <section></section>
      </DialogContent>
    </Dialog>
  );
}
