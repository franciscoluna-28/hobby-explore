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
import { Button } from "../ui/button";
import { deleteActivityByIdAction } from "@/actions/activity/delete";
import { Tables } from "@/lib/database";
import { useState } from "react";
import { ButtonLoading } from "../ui/button-loading";

// TODO: CREATE MORE DESCRIPTIVE MESSAGES
export function DeleteActivityDialog({
  children,
  activityId,
}: {
  children: React.ReactNode;
  activityId: Tables<"activities">["activity_id"];
}) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // TODO: ADD ACTUAL ERRORS AND STATES
  const handleDeleteActivity = async (
    activityId: Tables<"activities">["activity_id"]
  ): Promise<void> => {
    setIsLoading(true);
    const response = await deleteActivityByIdAction(activityId);

    setIsLoading(false);

    console.log(response);
  };

  return (
    <Dialog>
      {children}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <ButtonLoading
            isLoading={isLoading}
            onClick={() => handleDeleteActivity(activityId)}
            variant="destructive"
            type="submit"
          >
            Save changes
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
