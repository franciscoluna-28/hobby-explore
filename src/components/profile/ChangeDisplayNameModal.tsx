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
import { updateDisplayName } from "@/services/userServices";
import { useState } from "react";
import { toast } from "sonner";
import { Card } from "../ui/card";
import { User } from "lucide-react";

type Props = {
  defaultDisplayName: string;
  userId: string;
};

export function ChangeDisplayNameModal({ defaultDisplayName, userId }: Props) {
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
    const result = await updateDisplayName(newDisplayName, userId);

    if (!result.success) {
      toast.error(result.message);
      setIsChangingDisplayName(false);
      handleClose();
      return;
    }

    toast.success(result.message);

    setNewDisplayName(newDisplayName);
    setIsChangingDisplayName(false);
    handleClose();
  };

  // TODO: CREATE COMMON CARD ELEMENT
  return (
    <Card className=" flex items-center space-x-4 rounded-md border p-4">
      <User className="w-6 h-6" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Edit Display Name</p>
        <p className="text-sm text-muted-foreground">
          Change your display name.
        </p>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-[36px]" variant="outline">
            Edit Name
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Change your display name here. Click save when you&apos;re done. This field must have at most 50 characters. 
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label
                htmlFor="displayName"
                className="text-center leading-normal"
              >
                Display Name
              </Label>
              <Input
              maxLength={50}
                id="displayName"
                defaultValue={defaultDisplayName ?? newDisplayName}
                onChange={(e) => setNewDisplayName(e.target.value)}
                className="col-span-3"
              />
              
            </div>
          </div>
          <DialogFooter>
            <ButtonLoading
              disabled={newDisplayName === defaultDisplayName}
              onClick={handleUploading}
              isLoading={isChangingDisplayName}
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
