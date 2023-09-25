"use client";
import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useEffect } from "react";
import useTipStore from "@/store/tips-store";
import { useDropzone } from "react-dropzone";
import { MAX_TIPS_ALLOWED_VALUE } from "@/constants/create-activity";

export function Dropzone() {
  const [duplicateImageError, setDuplicateImageError] = useState<string | null>(
    null
  );

  const images = useTipStore((state) => state.images);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [".jpg", ".png"],
    },
    maxFiles: MAX_TIPS_ALLOWED_VALUE,
    onDrop: (acceptedFiles) => {
      // Filter out files that are already added to the state
      const newFiles = acceptedFiles.filter(
        (file) =>
          !images.some((existingImage) => existingImage.name === file.name)
      );

      // Check for duplicate images
      const duplicateImages = acceptedFiles.filter((file) =>
        images.some((existingImage) => existingImage.name === file.name)
      );

      if (duplicateImages.length > 0) {
        setDuplicateImageError("You're trying to add duplicate images!");
      } else {
        setDuplicateImageError(null);
      }

      // Use Promise.all to add unique images to the global state
      Promise.all(
        newFiles.map((image) => {
          return useTipStore.getState().addTipWithImage(image);
        })
      );
    },
  });

  useEffect(() => console.log(images), [images]);

  return (
    <div
      {...getRootProps()}
      className="border bg-white p-4 rounded-xl border-dashed flex items-center justify-between"
    >
      <div className="flex items-center">
        <div className="flex flex-col">
          <span className="block text-xl text-slate-500/40 font-bold mr-2">
            Add Photos
          </span>
          <span className="block text-sm mt-1 text-slate-500/60">
            Show off your expertise! Upload images and add your tips and tricks.
            Drag and drop supported!
          </span>
        </div>
      </div>
      <div className="bg-mainGreen p-1 rounded-full w-min cursor-pointer">
        <label htmlFor="fileInput" className="cursor-pointer">
          <AiOutlinePlus className="text-white text-2xl" />
        </label>
        <input
          {...getInputProps()}
          type="file"
          id="fileInput"
          className="hidden"
          multiple
        />
      </div>
      {duplicateImageError && (
        <div className="text-red-500">{duplicateImageError}</div>
      )}
    </div>
  );
}
