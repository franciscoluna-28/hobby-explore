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
import { revalidatePath } from "next/cache";
import { useState } from "react";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Home, SunMoon } from "lucide-react";

type Props = {
  defaultDisplayName: string;
  userId: string;
};

export function ChangeHomeModal({ defaultDisplayName, userId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isChangingHome, setIsChangingHome] = useState<boolean>(false);
  const [newHome, setNewHome] = useState<string>(defaultDisplayName);

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleUploading = async () => {
    setIsChangingHome(true);
    const result = await updateUserLocation(newHome, userId);

    if (!result.success) {
      toast.error(result.message);
      setIsChangingHome(false);
      handleClose();
      return;
    }

    toast.success(result.message);

    setIsChangingHome(false);
    handleClose();
  };

  return (
    <Card className=" flex items-center space-x-4 rounded-md border p-4">
      <Home className="w-6 h-6" />
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">Edit Home</p>
        <p className="text-sm text-muted-foreground">
          Change your profile location.
        </p>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-[36px]" variant="outline">
            Change Home
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Location</DialogTitle>
            <DialogDescription>
              Change your location here. This will be visible for all users.
              Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-center leading-normal">
                Location
              </Label>
              <Input
                id="location"
                defaultValue={""}
                onChange={(e) => setNewHome(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
          
            <ButtonLoading
              onClick={handleUploading}
              isLoading={isChangingHome}
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
