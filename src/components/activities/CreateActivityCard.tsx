import { Card, CardContent } from "@/components/ui/card";
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
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { UserAvatar } from "../profile/UserAvatar";
import { Tables } from "@/lib/database";

const getRenderText = (displayName: string | null | undefined): string => {
  return `Hey  ${
    displayName !== "" ? displayName : `user`
  }! share some activities and tell us how to do it.`;
};

export async function CreateActivityCard({
  user,
}: {
  user?: Tables<"users"> | null;
}) {
  if (!user) {
    return (
      <Dialog>
        <DialogTrigger className="w-full">
          <Card className="transition-all !w-full rounded-2xl border  shadow-sm hover:shadow-md duration-200 shadow-black/5 cursor-pointer">
            <CardContent className="flex items-center !p-4 gap-2">
              <UserAvatar shouldBeGuestUser />
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
              Hey! Before creating an activity in Hobby Explore you need to
              create an account. Only authorized users can share their hobbies.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <div className="flex gap-4">
              <DialogClose>
                <Button variant="ghost" type="button">
                  Okay, I understand
                </Button>
              </DialogClose>
              <Button asChild>
                <Link href="/auth/register">Create account</Link>
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
          <UserAvatar profilePictureUrl={user?.profile_picture_url} />
          <p className="text-textGray">{getRenderText(user?.displayName)}</p>
          <div className="ml-auto bg-mainGreen p-1 rounded-full text-white">
            <Plus className="text-white" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
