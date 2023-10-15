import { create } from "zustand";

type State = {
    profilePicture: File | null,
    bannerImage: File | null,
    name: string,
    birthDate: Date
}

type Actions = {
    addProfilePicture: (profilePicture: File) => void;
    addBannerImage: (bannerImage: File) => void;
    handleNameChange: (name: string) => void;
    handleBirthDateChange: (birthDate: Date) => void;   
}

const initialState: State = {
    profilePicture: null,
    bannerImage: null,
    name: "",
    birthDate: new Date()
}


const useAboutUserStore = create<State & Actions>((set) => ({
    ...initialState,
    addProfilePicture: (profilePicture: File) => {
        set((state) => ({
            ...state,
            profilePicture: profilePicture
        }));
    },
    addBannerImage: (bannerImage: File) => {
        set((state) => ({
            ...state,
            bannerImage: bannerImage
        }));
    },
    handleNameChange: (name: string) => {
        set((state) => ({
            ...state,
            name: name
        }));
    },
    handleBirthDateChange: (birthDate: Date) => {
        set((state) => ({
            ...state,
            birthDate: birthDate
        }));
    }
}));

export default useAboutUserStore;