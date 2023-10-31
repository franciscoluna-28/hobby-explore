import { useCallback, useState } from "react";
import { Slider } from "../ui/slider";
import Cropper from "react-easy-crop";
import getCroppedImg from "@/lib/get-cropped-image";
import { Button } from "../ui/button";

const EasyCrop = ({ image }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState<string | null>(null);

  console.log(croppedImage);

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        image,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation, image]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (croppedImage && croppedAreaPixels) {
      const formData = new FormData();
      formData.append("croppedImage", croppedImage);
      // You can now submit the formData to your server for further processing.
      // For example, you can use the fetch API to send the formData to your server.
      try {
        // Replace "YOUR_SERVER_ENDPOINT" with the actual server endpoint for image upload.
        const response = await fetch(`/get-started/api/upload-profile-images`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Fix typo here
          },
          body: JSON.stringify(croppedImage),
        });
        if (response.ok) {
          console.log(croppedImage)
          // Image uploaded successfully
          console.log("Image uploaded successfully");
        } else {
          console.error("Image upload failed");
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div>
      <button
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
        onClick={showCroppedImage}
      >
        Crop
      </button>
      <div
        className="container"
        style={{
          display: image === null || croppedImage !== null ? "none" : "block",
        }}
      >
        <div className="crop-container">
          <Cropper
            image={image}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            zoomSpeed={4}
            maxZoom={3}
            zoomWithScroll={true}
            showGrid={true}
            aspect={4 / 4}
            cropShape="round"
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
            onRotationChange={setRotation}
          />
        </div>
        <div className="controls">
          <label>
            Rotate
            <Slider
              defaultValue={[rotation]}
              min={0}
              max={360}
              step={1}
              aria-labelledby="rotate"
              onValueChange={(vals) => {
                setRotation(vals[0]);
              }}
              className="range"
            />
          </label>
          <label>
            Zoom
            <Slider
              defaultValue={[zoom]}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="zoom"
              onValueChange={(vals) => {
                setZoom(vals[0]);
              }}
            />
          </label>
        </div>
      </div>
      <div className="cropped-image-container">
        {croppedImage && (
          <img className="cropped-image" src={croppedImage} alt="cropped" />
        )}
        {croppedImage && (
          <form onSubmit={handleFormSubmit}>
            <button type="submit" className="text-black">
              Subir
            </button>
            <Button className="z-50" onClick={onClose}>
              close
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};

export default EasyCrop;
