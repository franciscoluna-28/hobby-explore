import React, { useState, useEffect } from "react";
import useImageStore from "@/store/tips-store";
import { TiDelete } from "react-icons/ti"
import { AiFillDelete } from "react-icons/ai";

export function TipList() {
  const tips = useImageStore((state) => state.tips);
  const removeTip = useImageStore((state) => state.removeTip)

  useEffect(() => console.log(tips), [tips])

  const handleSaveEdit = (tipId: string) => {
    // Implementa la lógica para guardar la edición del texto utilizando el estado global aquí
  };

  const handleRemoveTip = (tipId: string) => {
    // Implementa la lógica para eliminar el tip utilizando el estado global aquí
    removeTip(tipId);
  };


  const [imageData, setImageData] = useState<{ [key: string]: string | null }>(
    {}
  );

  const loadAndDisplayImage = (file: File, tipId: string) => {
    const reader = new FileReader();

    reader.onload = (e) => {
      if (e.target && e.target.result) {
        setImageData((prevImageData) => ({
          ...prevImageData,
          [tipId]: e.target.result as string,
        }));
      }
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    tips.forEach((tip) => {
      if (!imageData[tip.id]) {
        loadAndDisplayImage(tip.image, tip.id);
      }
    });
  }, [tips, imageData]);

  return (
    <div className="flex">
      {tips.map((tip) => (
        <div key={tip.id} className="mb-4">
          {imageData[tip.id] && (
            <div className="w-96 relative">
            <img
              src={imageData[tip.id]!}
              alt={tip.text}
              className="w-96 rounded-2xl border bg-blue"
            />
            <button
            onClick={() => handleRemoveTip(tip.id)}
            className="absolute right-4 top-4 p-2 bg-black/40  z-10 rounded-full text-white cursor-pointer"
          >
            <AiFillDelete className="text-xl"/>
          </button>  
            
          <div>
           
           

          </div>
          </div>
          )}
        
        </div>
      ))}
    </div>
  );
}
