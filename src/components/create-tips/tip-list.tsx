import React, { useState, useEffect } from "react";
import useImageStore from "@/store/tips-store";
import { AiFillDelete } from "react-icons/ai";
import { Textarea } from "../ui/textarea";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

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

  const animationVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0 },
  };

  return (
    <div className="grid grid-cols-2 w-full gap-4">
      <AnimatePresence>
        {tips.map((tip) => (
          <motion.div
            key={tip.id}
            className="mb-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={animationVariants}
          >
            {imageData[tip.id] && (
              <div className="w-full relative fit">
                <Image
                  src={imageData[tip.id]!}
                  alt={tip.text}
                  width={500}
                  height={500}
                  className="w-auto rounded-2xl object-contain max-h-64 border bg-blue rounded-b-none"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveTip(tip.id)}
                  className="absolute border border-black/20 right-4 w-min top-4 p-2 bg-white z-10 rounded-full text-white cursor-pointer"
                >
                  <AiFillDelete className="text-xl text-mainBlack" />
                </button>
                <Textarea
                  placeholder="Enter a brief description of your activity"
                  className="rounded-2xl border-t-0 rounded-t-none"
                  value={tip.text}
                  autoFocus
                  onChange={(e) => handleSaveEdit(tip.id, e.target.value)}
                />
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
