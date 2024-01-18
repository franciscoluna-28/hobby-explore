import { create } from "zustand";

interface AuthState {
  userProfilePhoto: string | null;
  userBannerProfilePhoto: string | null;
  userDescription: string | null;
  userUserName: string | null;
  displayName: string | null;
  setUserProfilePhotoUrl: (url: string) => void;
  setUserBannerPhotoUrl: (url: string) => void;
  setUserDescription: (newDescription: string) => void;
  setUserUserName: (newUserName: string) => void;
  setDisplayName: (newDisplayName: string) => void;
}

export const useAuth = create<AuthState>((set) => ({
  userProfilePhoto: null,
  userBannerProfilePhoto: null,
  userUserName: null,
  userDescription: null,
  displayName: null,
  setUserProfilePhotoUrl: (url) => {
    set(() => ({ userProfilePhoto: url }));
  },
  setUserBannerPhotoUrl: (url) => {
    set(() => ({ userBannerProfilePhoto: url }));
  },
  setUserDescription: (newDescription) => {
    set(() => ({ userDescription: newDescription }));
  },
  setUserUserName: (newUserName) => {
    set(() => ({ userUserName: newUserName }));
  },
  setDisplayName: (newDisplayName) => {
    set(() => ({ displayName: newDisplayName }));
  },
}));
