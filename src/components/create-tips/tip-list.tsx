"use client";
import React, { useState, useEffect } from "react";
import useImageStore from "@/store/tips-store";
import { AiFillDelete } from "react-icons/ai";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

export function TipList() {
  const tips = useImageStore((state) => state.tips);
  const updateTipText = useImageStore((state) => state.updateText);
  const removeTip = useImageStore((state) => state.removeTip);

  const handleSaveEdit = (tipId: string, newText: string) => {
    updateTipText(tipId, newText);
  };

  const handleRemoveTip = (tipId: string) => {
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
          [tipId]: e.target!.result as string,
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
    <div className="flex gap-4 flex-wrap">
      {tips.map((tip) => (
        <div key={tip.id} className="mb-4">
          {imageData[tip.id] && (
            <div className="w-full relative">
              <Image
                src={imageData[tip.id]!}
                alt={tip.text}
                className="w-96 rounded-2xl max-h-64 border bg-blue"
              />
              <button
                onClick={() => handleRemoveTip(tip.id)}
                className="absolute right-4 top-4 p-2 bg-white z-10 rounded-full text-white cursor-pointer"
              >
                <AiFillDelete className="text-xl text-mainBlack" />
              </button>
              <Textarea
                placeholder="Type your message here."
                className="rounded-2xl mt-2"
                value={tip.text}
                onChange={(e) => handleSaveEdit(tip.id, e.target.value)}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
