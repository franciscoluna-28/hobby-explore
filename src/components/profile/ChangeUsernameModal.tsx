"use client";

import { Button } from "@/components/ui/button";
import { ButtonLoading } from "@/components/ui/button-loading";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updateUserUsername } from "@/services/userServices";
import { useAuth } from "@/store/useAuthStore";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  defaultUserUserName: string;
  userId: string;
};

export function ChangeUserNameModal({ defaultUserUserName, userId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const userName = useAuth((state) => state.userUserName);
  const setUserName = useAuth((state) => state.setUserUserName);
  const [isChangingUserName, setIsChangingUserName] = useState<boolean>(false);
  const [newUserName, setNewUserName] = useState<string>(defaultUserUserName);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleUploading = async () => {
    setIsChangingUserName(true);
    const result = await updateUserUsername(newUserName, userId);



    if (!result.success) {
      toast.error(result.message);
      setIsChangingUserName(false);
      handleClose();
      return;
    }

    toast.success(result.message);

    setUserName(newUserName);
    setIsChangingUserName(false);
    handleClose();
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-[36px]" variant="outline">
          Edit username
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue={userName ?? ""}
              onChange={(e) => setNewUserName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <ButtonLoading
            onClick={handleUploading}
            isLoading={isChangingUserName}
            type="submit"
          >
            Save changes
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
