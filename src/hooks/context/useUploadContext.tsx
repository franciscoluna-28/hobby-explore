import { UploadContext } from "@/context/UploadContext";
import { useContext } from "react";

export const useUploadContext = () => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUploadContext must be used within an UploadProvider");
  }
  return context;
};
