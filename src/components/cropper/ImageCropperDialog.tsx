"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { cropImage } from "@/lib/cropper/cropperLib";
import { ButtonLoading } from "../ui/button-loading";
import { Dispatch, SetStateAction } from "react";

type ImageCropperDialogProps = {
  open: boolean;
  isLoading: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  image: string | null;
  onComplete: any;
  containerStyle: any;
};

type CropAxis = {
  x: number;
  y: number;
};

//TODO: CLOSE THE MODAL AND DELETE THE IMAGE WHEN CLOSING
// TODO: IMPROVE ERROR HANDLING AND CREATE A GLOBAL CONTEXT TO AVOID PROP DRILLING
export function ImageCropperDialog({
  image,
  open,
  isLoading,
  onComplete,
  containerStyle,
  setIsOpen,
  ...props
}: ImageCropperDialogProps) {
  const [crop, setCrop] = useState<CropAxis>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you are done.
          </DialogDescription>
        </DialogHeader>
        <div style={containerStyle}>
          <Cropper
            image={image ?? ""}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onCropComplete={(_, croppedAreaPixels) => {
              setCroppedAreaPixels(croppedAreaPixels);
            }}
            onZoomChange={setZoom}
            {...props}
          />
        </div>
        <DialogFooter>
          <ButtonLoading
            isLoading={isLoading}
            onClick={() =>
              onComplete(cropImage(image ?? "", croppedAreaPixels, console.log))
            }
            type="submit"
          >
            Save changes
          </ButtonLoading>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
