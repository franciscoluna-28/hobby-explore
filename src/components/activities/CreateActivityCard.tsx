import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getSupabaseFileUrlFromRelativePath } from "@/services/supabase/storage";
import { getCurrentUser } from "@/services/auth";
import { Plus } from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

const getRenderText = (displayName: string | null | undefined): string => {
  return `Hey  ${
    displayName !== "" ? displayName : `user`
  }! share some activities and tell us how to do it.`;
};

export async function CreateActivityCard() {
  const user = await getCurrentUser();

  if (!user) {
    return (
      <Dialog>
         <DialogTrigger className="w-full">
        <Card className="transition-all !w-full rounded-2xl border  shadow-sm hover:shadow-md duration-200 shadow-black/5 cursor-pointer">
          <CardContent className="flex items-center !p-4 gap-2">
            <Avatar>
              <AvatarImage src={"https://github.com/shadcn.png"} alt="User" />
              <AvatarFallback>User</AvatarFallback>
            </Avatar>
            <p className="text-textGray dark:text-darkGray">{`Hey guest! Welcome to Hobby Explore!`}</p>
            <div className="ml-auto bg-mainGreen p-1 rounded-full text-white">
              <Plus className="text-white" />
            </div>
          </CardContent>
        </Card>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create an account</DialogTitle>
            <DialogDescription>
             Hey! Before creating an activity in Hobby Explore you need to create an account. Only authorized users can share their hobbies.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
      <div className="flex gap-4">
        <DialogClose>
        <Button variant="ghost" type="button">Okay, I understand</Button>
        </DialogClose>
        <Button asChild>
          <Link href="/register"> Create account</Link>
        </Button>
      </div>
    </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Link href="/app/create" className="cursor-pointer">
      <Card className="transition-all !w-full rounded-2xl border shadow-sm hover:shadow-md duration-200 shadow-black/5">
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
