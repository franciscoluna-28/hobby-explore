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
import {
  updateDisplayName,
  updateUserLocation,
  updateUserUsername,
} from "@/services/userServices";
import { useAuth } from "@/store/useAuthStore";
import { revalidatePath } from "next/cache";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  defaultDisplayName: string;
  userId: string;
};

export function ChangeHomeModal({ defaultDisplayName, userId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChangingDisplayName, setIsChangingDisplayName] =
    useState<boolean>(false);
  const [newDisplayName, setNewDisplayName] =
    useState<string>(defaultDisplayName);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleUploading = async () => {
    setIsChangingDisplayName(true);
    const result = await updateUserLocation(newDisplayName, userId);

    if (!result.success) {
      toast.error(result.message);
      setIsChangingDisplayName(false);
      handleClose();
      return;
    }

    toast.success(result.message);

    setIsChangingDisplayName(false);
    handleClose();

  };

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button className="rounded-[36px]" variant="outline">
          Change Home
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Change your display name here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="displayName" className="text-center leading-normal">
              Display Name
            </Label>
            <Input
              id="displayName"
              defaultValue={""}
              onChange={(e) => setNewDisplayName(e.target.value)}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
            <p>{defaultDisplayName}</p>
          <ButtonLoading
            onClick={handleUploading}
            isLoading={isChangingDisplayName}
            type="submit"
          >
            Save changes
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
