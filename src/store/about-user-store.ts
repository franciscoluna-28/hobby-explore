import { create } from "zustand";

type State = {
  profilePicture: File | null;
  bannerImage: File | null;
  name: string;
  home: string;
  birthDate: Date;
};

type Actions = {
  addProfilePicture: (profilePicture: File) => void;
  addBannerImage: (bannerImage: File) => void;
  handleNameChange: (name: string) => void;
  handleHomeChange: (home: string) => void;
  handleBirthDateChange: (birthDate: Date) => void;
};

const useAboutUserStore = create<State & Actions>((set) => ({
  profilePicture: null,
  bannerImage: null,
  name: "",
  home: "",
  birthDate: new Date(),
  addProfilePicture: (profilePicture) => {
    set((state) => ({ ...state, profilePicture }));
  },
  addBannerImage: (bannerImage) => {
    set((state) => ({ ...state, bannerImage }));
  },
  handleNameChange: (value) => set({ name: value }),
  handleHomeChange: (value) => set({ home: value }),
  handleBirthDateChange: (birthDate) => {
    set((state) => ({ ...state, birthDate }));
  },
}));

export default useAboutUserStore;
