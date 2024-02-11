"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { cropImage } from "@/lib/cropper/cropperLib";

type ImageCropperDialogProps = {
  open: boolean;
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
  onComplete,
  containerStyle,
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
    <Dialog open={open}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
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
          <Button
            onClick={() =>
              onComplete(cropImage(image ?? "", croppedAreaPixels, console.log))
            }
            type="submit"
          >
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
