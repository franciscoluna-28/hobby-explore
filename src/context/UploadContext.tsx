"use client"

import React, { createContext, ReactNode, useContext, useState } from "react";

interface UploadContextProps {
  isUploadingProfile: boolean;
  isUploadingBanner: boolean;
  setIsUploadingProfile: React.Dispatch<React.SetStateAction<boolean>>;
  setIsUploadingBanner: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UploadContext = createContext<UploadContextProps | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isUploadingProfile, setIsUploadingProfile] = useState<boolean>(false);
  const [isUploadingBanner, setIsUploadingBanner] = useState<boolean>(false);

  return (
    <UploadContext.Provider
      value={{
        isUploadingProfile,
        isUploadingBanner,
        setIsUploadingProfile,
        setIsUploadingBanner,
      }}
    >
      {children}
    </UploadContext.Provider>
  );
};
