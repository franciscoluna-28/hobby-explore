import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

export function TipsSliderAuth() {
  const [currentTipIndex, setCurrentTipIndex] = useState<number>(0);

  const TIPS = [
    {
      text: "Use the mixolydian scale when composing emotional Synthwave music!",
      imageSrc:
        "https://images.unsplash.com/photo-1633933703119-5d25460ad829?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      blurhash: "L9BL;f4R?a$*?aGs-pOq0e{fNaWX", 
    },
    {
      text: "Use your nights to build side projects and grow as a developer.",
      imageSrc:
        "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
      blurhash: "LA8po*nS01TGJUWVw]sp00XO~Wn7", 

    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTipIndex((prevIndex: number) => (prevIndex + 1) % TIPS.length);
    }, 4000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const variants = {
    initial: { x: 0, opacity: 0 }, // Fuera de la pantalla a la izquierda
    animate: { x: 0, opacity: 1 }, // En pantalla
    exit: { x: 0, opacity: 0 }, // Fuera de la pantalla a la derecha
  };

  return (
    <>
    <div className="min-h-full min-w-full flex items-center">
    <AnimatePresence mode="wait">
        <motion.div
          key={currentTipIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="w-full overflow-hidden"
        >
      <Image
        alt="Background Image"
        src={TIPS[currentTipIndex].imageSrc}
        width={1920}
        height={1080}
        blurDataURL={TIPS[currentTipIndex].blurhash}
        placeholder="blur"
        className="aspect-square max-h-[500px] transition-all object-cover rounded-lg !m-auto !w-full"
      />
            </motion.div>
      </AnimatePresence>

      </div>


      <AnimatePresence mode="wait">
        <motion.div
          key={currentTipIndex}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={variants}
          className="w-full overflow-hidden"
        >
          <div className="absolute bottom-16 left-0 bg-ratingYellow p-4 rounded-b-[16px] shadow-lg w-full">
            <span className="text-mainBlack font-semibold">
              Tip #{currentTipIndex + 1}
            </span>
            <p className="text-sm mt-2 text-mainBlack">
              {TIPS[currentTipIndex].text}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
