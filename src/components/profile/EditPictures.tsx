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
import { ButtonLoading } from "../ui/button-loading";
import { ImageCropperDialog } from "../cropper/ImageCropperDialog";
import { dataURLtoFile } from "@/lib/blob";
import {
  updateUserProfilePicture,
  updateUserBannerPicture,
} from "@/services/userServices";
import { toast } from "sonner";
import { useUploadContext } from "@/hooks/context/useUploadContext";
import { ProfileImagesFileSchema } from "@/schemas/files/ProfileImagesFileSchema";
import { ZodError } from "zod";

type Props = {
  userId: string;
};

// TODO: DON'T OPEN THE DIALOG WHEN THE USER UPLOAD AN INVALID IMAGE
export function EditPictures({ userId }: Props) {
  const {
    isUploadingProfilePicture,
    isUploadingBannerPicture,
    setIsUploadingProfilePicture,
    setIsUploadingBannerPicture,
  } = useUploadContext();

  // State and refs
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [cropperModalOpen, setCropperModalOpen] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);

  // Controls the profile picture input
  const profilePictureInputFile = useRef<HTMLInputElement | null>(null);

  const bannerPictureInputFile = useRef<HTMLInputElement | null>(null);

  // Make sure to use the previous state
  const closeModal = () => {
    setOpenModal(false);
  };

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    try {
      if (!event.target.files) return;
      setImage(event.target.files[0]);
      setCropperModalOpen(true);

      ProfileImagesFileSchema.parse({
        image: event.target.files[0],
      });
    } catch (error) {
      if (error instanceof ZodError) {
        setCropperModalOpen(false);
        toast.error(
          error.errors.length > 1
            ? error.errors[1].message
            : error.errors[0].message
        );
      }
    }
  }

  const handleProfilePictureUpload = async (croppedImage: File) => {
    closeModal();

    try {
      setIsUploadingProfilePicture(true);

      const formData = new FormData();

      formData.append("profilePicture", croppedImage);

      const res = await updateUserProfilePicture(formData, userId);

      if (res.success) {
        setIsUploadingProfilePicture(false);
        toast.success(res.message);
        closeModal();
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
    } finally {
      setIsUploadingProfilePicture(false);
      closeModal();
      setCropperModalOpen(false);
    }
  };

  const handleBannerPictureUpload = async (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    setIsUploadingBannerPicture(true);
    setImage(event.target.files[0]);
    try {
      const formData = new FormData();

      formData.append("bannerPicture", image as File);

      const res = await updateUserBannerPicture(formData, userId);

      if (res.success === false) {
        toast.error(res.message);
      }

      if (res.success) {
        setIsUploadingBannerPicture(false);
        setIsUploadingProfilePicture(false);
        toast.success(res.message);
        closeModal();
      }
    } catch (error) {
      console.error("Error handling file upload:", error);
    } finally {
      closeModal();
      setIsUploadingBannerPicture(false);
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
    <>
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogTrigger asChild>
          <Button disabled={!userId} variant="icon">
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
              isLoading={isUploadingProfilePicture}
              disabled={isUploadingBannerPicture || isUploadingProfilePicture}
              onClick={onProfileButtonClick}
            >
              Profile picture
              <input
                type="file"
                id="file"
                disabled={isUploadingBannerPicture || isUploadingProfilePicture}
                ref={profilePictureInputFile}
                className="hidden"
                onChange={handleFileChange}
              />
            </ButtonLoading>
            <ButtonLoading
              variant="outline"
              isLoading={isUploadingBannerPicture}
              disabled={isUploadingBannerPicture || isUploadingProfilePicture}
              onClick={onBannerButtonClick}
            >
              Cover picture
              <input
                type="file"
                id="file2"
                disabled={isUploadingBannerPicture || isUploadingProfilePicture}
                ref={bannerPictureInputFile}
                className="hidden"
                onChange={handleBannerPictureUpload}
              />
            </ButtonLoading>
          </div>
        </DialogContent>
      </Dialog>
      <ImageCropperDialog
        isLoading={isUploadingProfilePicture}
        containerStyle={{
          position: "relative",
          width: "100%",
          height: 300,
          background: "#333",
        }}
        open={cropperModalOpen}
        setIsOpen={setCropperModalOpen}
        image={image ? URL.createObjectURL(image) : null}
        onComplete={(imagePromise: Promise<string>) => {
          imagePromise.then((image: string) => {
            handleProfilePictureUpload(dataURLtoFile(image, "Blob"));
          });
        }}
      />
    </>
  );
}
