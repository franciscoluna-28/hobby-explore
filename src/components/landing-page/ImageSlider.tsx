import React, { useState, useEffect } from "react";
import {
  LANDING_PAGE_IMAGES,
  LandingPageImage,
} from "@/database/image-placeholder";
import Image from "next/image";
import clsx from 'clsx'; // Importa clsx

interface ImageSliderProps {
  rotationDegree: number;
  isNegative: boolean;
}


const ImageSlider: React.FC<ImageSliderProps> = ({ rotationDegree, isNegative }) => {
  const [currentImage, setCurrentImage] = useState<LandingPageImage | null>(
    null
  );
  const [loading, setLoading] = useState(true);
    console.log(currentImage)

  useEffect(() => {
    // Función para seleccionar una imagen aleatoria
    const selectRandomImage = () => {
      const randomIndex = Math.floor(
        Math.random() * LANDING_PAGE_IMAGES.length
      );
      setCurrentImage(LANDING_PAGE_IMAGES[randomIndex]);
      setLoading(true); // Iniciar el estado de carga al cambiar la imagen
    };

    // Selecciona una imagen aleatoria al cargar el componente
    selectRandomImage();
  }, []);

  const handleImageLoad = () => {
    setLoading(false); // Cambiar el estado de carga cuando la imagen se carga
  };

  const imageContainerClasses = clsx(
    'absolute',
    `!rotate-[${rotationDegree}deg]`,
    'max-w-fit',
    'max-h-[800px]',  
    'z-40',
    'w-full',
    'hover:scale-105',
    'duration-200',
    "opacity-100",
    "duration-200",
    {
      'border-[20px]': !loading,
      "opacity-0": !loading, // Agregar el borde solo cuando no se está cargando
      'rounded-2xl': !loading, // Agregar redondez solo cuando no se está cargando
    }
  );

  console.log(rotationDegree)

  return (
    <div className={imageContainerClasses}>
      {loading && <div className="loading-indicator"></div>}
      {currentImage && (
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={600}
          height={600}
          className={clsx(
            'rounded-md',
            'object-cover',
            
            
          )}
          onLoad={handleImageLoad}
        />
      )}
    </div>
  );
};

export default ImageSlider;

