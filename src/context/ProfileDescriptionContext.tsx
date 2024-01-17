"use client"

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ProfileDescriptionContextProps {
  isUploadingDescription: boolean;
  isCurrentlyEditing: boolean;
  startEditing: () => void;
  stopEditing: () => void;
  startUploading: () => void;
  stopUploading: () => void;
}

const ProfileDescriptionContext = createContext<
  ProfileDescriptionContextProps | undefined
>(undefined);

interface ProfileDescriptionProviderProps {
  children: ReactNode;
}

export const ProfileDescriptionProvider: React.FC<
  ProfileDescriptionProviderProps
> = ({ children }) => {
  const [isUploadingDescription, setIsUploadingDescription] = useState(false);
  const [isCurrentlyEditing, setIsCurrentlyEditing] = useState(false);

  const startEditing = () => {
    setIsCurrentlyEditing(true);
  };

  const stopEditing = () => {
    setIsCurrentlyEditing(false);
  };

  const startUploading = () => {
    setIsUploadingDescription(true);
  };

  const stopUploading = () => {
    setIsUploadingDescription(false);
  };

  const contextValue: ProfileDescriptionContextProps = {
    isUploadingDescription,
    isCurrentlyEditing,
    startEditing,
    stopEditing,
    startUploading,
    stopUploading,
  };

  return (
    <ProfileDescriptionContext.Provider value={contextValue}>
      {children}
    </ProfileDescriptionContext.Provider>
  );
};

export const useProfileDescription = (): ProfileDescriptionContextProps => {
  const context = useContext(ProfileDescriptionContext);
  if (!context) {
    throw new Error("useProfileDescription must be used within a ProfileDescriptionProvider");
  }
  return context;
};