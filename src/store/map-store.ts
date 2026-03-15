import { create } from "zustand";

interface MapState {
  selectedCountrySlug: string | null;
  setSelectedCountry: (slug: string | null) => void;
}

export const useMapStore = create<MapState>((set) => ({
  selectedCountrySlug: null,
  setSelectedCountry: (slug) => set({ selectedCountrySlug: slug }),
}));
