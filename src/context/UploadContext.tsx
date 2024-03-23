"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";

interface UploadContextProps {
  isUploadingProfilePicture: boolean;
  isUploadingBannerPicture: boolean;
  setIsUploadingProfilePicture: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUploadingBannerPicture: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isUploadingProfilePicture, setIsUploadingProfilePicture] = useState<boolean>(false);
  const [isUploadingBannerPicture, setIsUploadingBannerPicture] = useState<boolean>(false);

  return (
    <UploadContext.Provider
      value={{
        isUploadingProfilePicture,
        isUploadingBannerPicture,
        setIsUploadingProfilePicture,
        setIsUploadingBannerPicture,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
