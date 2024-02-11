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
import { CaseUpper } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";

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

  // TODO: CHECK IF THE USERNAME EXISTS BEFORE TRYING TO UPLOAD IT
  // TODO: ADD ZOD VALIDATION
  // TODO: UPDATE DEFAULT VALUES
  return (
    <Card className=" flex items-center space-x-4 rounded-md border p-4 relative">
      <CaseUpper className="w-6 h-6" />
      {userName === "" || userName === undefined ? (
        <div className="absolute -top-1 -right-1">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
        </div>
      ) : null}

      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">
          {userName === "" || userName === null
            ? "Create username"
            : "Change username"}
        </p>
        <p className="text-sm text-muted-foreground">Change your username.</p>
      </div>
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
              Make changes to your profile here. Click save when you&apos;re
              done.
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
    </Card>
  );
}
