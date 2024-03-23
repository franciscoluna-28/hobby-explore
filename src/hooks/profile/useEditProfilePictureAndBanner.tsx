import { ChangeEvent, Dispatch, SetStateAction, useRef, useState } from "react";
import { useUploadContext } from "../context/useUploadContext";

export function useEditProfilePictureAndBanner() {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [isCropperModalOpen, setIsCropperModalOpen] = useState<boolean>(false);
  const [profilePicture, setProfilePicture] = useState<File | null>(null);
  const [bannerPicture, setBannerPicture] = useState<File | null>(null);
  const {
    isUploadingProfilePicture,
    isUploadingBannerPicture,
    setIsUploadingProfilePicture,
    setIsUploadingBannerPicture,
  } = useUploadContext();

  // Get the previous state and change it
  const handleCloseModal = () => {
    setOpenModal((state) => !state);
  };

  // Because of DRY, we're creating a generic function to deal with the modal logic as well as the file one
  const handleFileChange = (
    event: ChangeEvent<HTMLInputElement>,
    stateSetter: Dispatch<SetStateAction<File | null>>
  ) => {
    if (!event.target.files) return;
    stateSetter(event.target.files[0]);
    setIsCropperModalOpen(true);
  };

  // References both the profile picture and the banner input fields
  const profilePictureInputFile = useRef<HTMLInputElement | null>(null);
  const bannerPictureInputFile = useRef<HTMLInputElement | null>(null);


}
