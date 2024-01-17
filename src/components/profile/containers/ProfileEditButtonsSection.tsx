"use client";

import { EditDescription } from "../EditDescription";
import { EditPictures } from "../EditPictures";
import { useProfileDescription } from "@/context/ProfileDescriptionContext";
import { ChangeDescriptionTextArea } from "../ChangeDescriptionTextArea";
import { useEffect } from "react";
import { useAuth } from "@/store/useAuthStore";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  userId: string;
  defaultDescription: string;
};

export function ProfileEditButtonsSection({
  userId,
  defaultDescription,
}: Props) {
  const { isCurrentlyEditing } = useProfileDescription();
  const setDescription = useAuth((state) => state.setUserDescription);

  useEffect(() => {
    setDescription(defaultDescription);
  }, [setDescription]);

  return (
    <section className="flex justify-center items-center gap-4 mt-4 min-h-16">
      <AnimatePresence mode="wait">
        {isCurrentlyEditing ? (
          <ChangeDescriptionTextArea
            key="profileDescription"
            userId={userId}
            defaultDescription={defaultDescription}
          />
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ease: "circIn", duration: 0.15 }}
              exit={{ opacity: 0 }}
              className="grid gap-4 sm:flex"
            >
              <EditDescription key="editDescription" />
              <EditPictures key="editPicture" userId={userId} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
