import { create } from "zustand";

interface AuthState {
  userProfilePhoto: string | null;
  userBannerProfilePhoto: string | null;
  userDescription: string | null;
  setUserProfilePhotoUrl: (url: string) => void;
  setUserBannerPhotoUrl: (url: string) => void;
  setUserDescription: (newDescription: string) => void;
}

export const useAuth = create<AuthState>((set) => ({
  userProfilePhoto: null,
  userBannerProfilePhoto: null,
  userDescription: null,
  setUserProfilePhotoUrl: (url) => {
    set(() => ({ userProfilePhoto: url }));
  },
  setUserBannerPhotoUrl: (url) => {
    set(() => ({ userBannerProfilePhoto: url }));
  },
  setUserDescription: (newDescription) => {
    set(() => ({ userDescription: newDescription }));
  },
}));
