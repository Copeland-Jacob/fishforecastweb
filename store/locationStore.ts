import { create } from "zustand";

type Location = {
    name: string,
    city: string,
    state: string,
    lat: number,
    lon: number
};

type Store = {
    location: Location | null
    setLocation: (loc: Location) => void;
};

export const useLocationStore = create<Store>((set) => ({
    location: null,

    setLocation: (loc) =>
        set({
            location: loc
        }),
}));