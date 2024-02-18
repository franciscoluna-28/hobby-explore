import { create } from "zustand";

// The ID is obtained from mapping the tip object from React Hook Form dynamically. It's not from the form itself, but from 'fields'
// Image URL is a base64 encoded string.
interface TipImage {
  tipId: string;
  imageUrl: string;
}

// TODO: IMPLEMENT A FUNCTIONALITY TO DELETE ALL THE TIPS WHEN SUBMIT
interface TipStore {
  tipImages: TipImage[];
  addOrUpdateTip: (tipId: string, imageUrl: string) => void;
  getTipImageUrlById: (tipId: string) => string;
}

const TIP_NOT_FOUND: number = -1;

/** Store to store tips images since React Hook Form doesn't handle passing files in all browsers.
 * The purpose of this store is to update the tips images dynamically whenever the dropzone receives a new valid file.
 *
 */
const useTipStore = create<TipStore>((set, get) => ({
  tipImages: [],

  // Add a new tip or update an existing one
  addOrUpdateTip: (tipId, imageUrl) => {
    set((state) => {
      const existingTipIndex = state.tipImages.findIndex(
        (tip) => tip.tipId === tipId
      );

      if (existingTipIndex !== TIP_NOT_FOUND) {
        // Update existing tip image
        const updatedTipImages = [...state.tipImages];
        updatedTipImages[existingTipIndex] = {
          ...updatedTipImages[existingTipIndex],
          imageUrl,
        };
        return { tipImages: updatedTipImages };
      }

      // Add a new tip
      return { tipImages: [...state.tipImages, { tipId, imageUrl }] };
    });
  },

  getTipImageUrlById: (tipId): string => {
    const tip = get().tipImages.find((tip) => tip.tipId === tipId);
    return tip ? tip.imageUrl : "";
  }
  
}));

export default useTipStore;
