"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useProfileDescription } from "@/context/ProfileDescriptionContext";
import { updateUserDescription } from "@/services/userServices";
import { useAuth } from "@/store/useAuthStore";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { ButtonLoading } from "../ui/button-loading";
import { motion } from "framer-motion";
import { UserDescriptionSchema } from "@/schemas/UserDescriptionSchema";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
 

type Props = {
  defaultDescription: string;
  userId: string;
};

export function ChangeDescriptionTextArea({
  defaultDescription,
  userId,
}: Props) {
  const { stopEditing, isUploadingDescription, stopUploading, startUploading } =
    useProfileDescription();

  const setUserDescription = useAuth((state) => state.setUserDescription);

  const userDescription = useAuth((state) => state.userDescription);

  const [newDescription, setNewDescription] =
    useState<string>(defaultDescription);

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setNewDescription(event.target.value);
  };

  const handleSave = async () => {
    startUploading();

    try {
      // Guard clause: Validate description using Zod schema
      const validationResult = UserDescriptionSchema.safeParse(newDescription);

      if (validationResult.success === false) {
        const validationError = validationResult.error;
        console.error("Validation error:", validationError.errors);
        toast.error(
          `Description validation failed: ${validationResult.error.errors[0].message}.`
        );
        stopUploading();
        return;
      }

      const updateResult = await updateUserDescription(newDescription, userId);

      if (updateResult.success) {
        toast.success(updateResult.message);
        setUserDescription(newDescription);
        stopUploading();
        handleCancel();
        return;
      }

      toast.error(updateResult.message);
      handleCancel();
    } catch (error) {
      if (error instanceof Error && "issues" in error) {
        console.error("Error updating description:", error);
        toast.error(
          `An error occurred while updating description: ${error.message}`
        );
        stopUploading();
      }
    }
  };

  const handleCancel = () => {
    stopEditing();
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleCancel();
      }
    };

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "circIn", duration: 0.15 }}
      exit={{ opacity: 0 }}
      className="grid relative h-16 w-full sm:w-[600px]"
    >
      <div className="">
        
        <Textarea
          className="text-left pr-48 !h-8"
          onChange={handleDescriptionChange}
          defaultValue={userDescription ?? ""}
          placeholder="Change your description here."
        />

        <div className="absolute top-1/2 -translate-y-1/2 right-4 !h-6">
          <div className="flex gap-4 items-center m-auto">
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <ButtonLoading
              onClick={handleSave}
              isLoading={isUploadingDescription}
              className="bg-mainGreen text-white hover:brightness-90 hover:bg-mainGreen"
            >
              Save
            </ButtonLoading>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
