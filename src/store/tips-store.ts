import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";
import { Tips } from "@/tips/tips";

// Global state of tips and images, where each tip includes an image and text
type State = {
  tips: Tips[];
  images: File[];
};

// Actions that can change the state
type Actions = {
  addTipWithImage: (image: File) => void;
  updateText: (id: string, text: string) => void;
  removeTip: (id: string) => void;
  resetTips: () => void;
};

// Store with both state and actions
const useTipStore = create<State & Actions>((set) => ({
  tips: [],
  images: [],

  addTipWithImage: (image: File) =>
    set((state) => {
      // Check if the image is already in the images array
      if (
        !state.images.some((existingImage) => existingImage.name === image.name)
      ) {
        const newTip = { id: uuidv4(), image, text: "" };
        return {
          tips: [...state.tips, newTip],
          images: [...state.images, image],
        };
      }
      return state;
    }),

  updateText: (id: string, text: string) =>
    set((state) => {
      const updatedTips = state.tips.map((tip) =>
        tip.id === id ? { ...tip, text } : tip
      );
      return { tips: updatedTips, images: state.images };
    }),

  removeTip: (id: string) =>
    set((state) => {
      const removedTip = state.tips.find((tip) => tip.id === id);
      if (removedTip) {
        const updatedImages = state.images.filter(
          (image) => image !== removedTip.image
        );

        return {
          tips: state.tips.filter((tip) => tip.id !== id),
          images: updatedImages,
        };
      }
      return state;
    }),

  resetTips: () =>
    set(() => ({
      tips: [],
      images: [],
    })),
}));

export default useTipStore;
