"use client";

import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { useProfileDescription } from "@/context/ProfileDescriptionContext";

export function EditDescription({ userId }: { userId?: string }) {
  const { startEditing } = useProfileDescription();

  const handleEdit = () => {
    startEditing();
  };

  return (
    <Button disabled={!userId} variant="icon" onClick={handleEdit}>
      <FaEdit className="h-fit w-fit" /> Change Description
    </Button>
  );
}
