"use client";

import {
  Dialog,
  DialogFooter,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteActivityByIdAction } from "@/actions/activity/delete";
import { Tables } from "@/lib/database";
import { useState } from "react";
import { ButtonLoading } from "../ui/button-loading";
import { toast } from "sonner";

export function DeleteActivityDialog({
  children,
  activityId,
}: {
  children: React.ReactNode;
  activityId: Tables<"activities">["activity_id"];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleDeleteActivity = async (
    activityId: Tables<"activities">["activity_id"]
  ): Promise<void> => {
    setIsLoading(true);
    const response = await deleteActivityByIdAction(activityId);

    if(!response.success) {
      toast.error(response.message);
      setIsLoading(false);
      setIsOpen(false);
    }


    setIsLoading(false);
    toast.success(response.message);


    console.log(response);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone and your activity will be deleted from the servers. 
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ButtonLoading
            isLoading={isLoading}
            onClick={() => handleDeleteActivity(activityId)}
            variant="destructive"
            type="submit"
          >
            Yes, delete activity
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
