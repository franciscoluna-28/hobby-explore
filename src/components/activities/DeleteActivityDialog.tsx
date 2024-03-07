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


// TODO: CREATE MORE DESCRIPTIVE MESSAGES
export function DeleteActivityDialog({
  children,
  activityId,
}: {
  children: React.ReactNode;
  activityId: Tables<"activities">["activity_id"];
}) {
  const handleDeleteActivity = async (
    activityId: Tables<"activities">["activity_id"]
  ): Promise<void> => {
    const response = await deleteActivityByIdAction(activityId);

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
          <Button
            onClick={() => handleDeleteActivity(activityId)}
            variant="destructive"
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
