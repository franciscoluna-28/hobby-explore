import { ChangeEvent, DragEvent } from "react";
import useTipStore from "@/store/tips-store";

export function useImageDropzone(
  accept: string | undefined = ".jpg, .jpeg, .png, .gif",
) {
  const isImageValid = (file: File): boolean => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif"];
    const extension = file.name.split(".").pop()?.toLowerCase();

    if (extension) {
      return allowedExtensions.includes(extension);
    }

    return false;
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const newFiles = [...e.dataTransfer.files].filter(isImageValid);

    // Agregar las imágenes directamente al estado global de tips
    newFiles.forEach((image) => {
      useTipStore.getState().addTipWithImage(image);
    });
  };

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const inputFiles = e.target.files;
    if (inputFiles) {
      const newFiles = Array.from(inputFiles).filter((file) =>
        isImageValid(file)
      );

      // Agregar las imágenes directamente al estado global de tips
      newFiles.forEach((image) => {
        useTipStore.getState().addTipWithImage(image);
      });
    }
  };

  return {
    handleDrop,
    handleFileInput,
    accept,
  };
}
