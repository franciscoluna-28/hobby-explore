import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio"

export function MyDropzone() {
  const [image, setImage] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => console.log("file reading was aborted");
      reader.onerror = () => console.log("file reading has failed");
      reader.onload = () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        setImage(binaryStr);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, maxFiles: 1 });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {image ? (
        <div className="w-[450px] border-red-500 border-4">
  <AspectRatio ratio={16 / 9}>
    <img src={image} alt="Image" className="rounded-md object-cover" />
  </AspectRatio>
</div>
      ) : (
        <p>
          Arrastra y suelta algunos archivos aquí, o haz clic para seleccionar
          archivos
        </p>
      )}
    </div>
  );
}
