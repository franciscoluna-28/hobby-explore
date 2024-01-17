"use client";

import { MdOutlineCameraAlt } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChangeEvent, useRef, useState } from "react";
import { usePictureUpload } from "@/hooks/useProfilePicturesUpload";
import { ButtonLoading } from "../ui/button-loading";

type Props = {
  userId: string;
};

export function EditPictures({ userId }: Props) {
  const {
    uploadProfilePicture,
    uploadBannerPicture,
    isUploadingBanner,
    isUploadingProfile,
  } = usePictureUpload(userId);

  // State and refs
  const [openModal, setOpenModal] = useState<boolean>(false);

  // Controls the profile picture input
  const profilePictureInputFile = useRef<HTMLInputElement | null>(null);

  const bannerPictureInputFile = useRef<HTMLInputElement | null>(null);

  // Make sure to use the previous state
  const closeModal = () => {
    setOpenModal((state) => !state);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    try {
      uploadProfilePicture(file);
    } catch (error) {
      console.error("Error handling file upload:", error);
    } finally {
      closeModal();
    }
  };

  const handleBannerUpload = (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    try {
      uploadBannerPicture(file);
    } catch (error) {
      console.error("Error handling file upload:", error);
    } finally {
      closeModal();
    }
  };

  // Open the actual file navigator
  const onProfileButtonClick = () => {
    if (profilePictureInputFile.current !== null) {
      profilePictureInputFile.current.click();
    }
  };

  const onBannerButtonClick = () => {
    if (bannerPictureInputFile.current !== null) {
      bannerPictureInputFile.current.click();
    }
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="icon">
          <MdOutlineCameraAlt /> Change Pictures
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Pictures</DialogTitle>
          <DialogDescription>
            Change your banner or profile picture here.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col w-full gap-4">
          <ButtonLoading
            variant="outline"
            isLoading={isUploadingProfile}
            disabled={isUploadingBanner || isUploadingProfile}
            onClick={onProfileButtonClick}
          >
            Profile picture
            <input
              type="file"
              id="file"
              disabled={isUploadingBanner || isUploadingProfile}
              ref={profilePictureInputFile}
              className="hidden"
              onChange={handleFileUpload}
            />
          </ButtonLoading>
          <ButtonLoading
            variant="outline"
            isLoading={isUploadingBanner}
            disabled={isUploadingBanner || isUploadingProfile}
            onClick={onBannerButtonClick}
          >
            Cover picture
            <input
              type="file"
              id="file2"
              disabled={isUploadingBanner || isUploadingProfile}
              ref={bannerPictureInputFile}
              className="hidden"
              onChange={handleBannerUpload}
            />
          </ButtonLoading>
        </div>
      </DialogContent>
    </Dialog>
  );
}
