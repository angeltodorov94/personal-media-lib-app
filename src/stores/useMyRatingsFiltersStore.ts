import { MediaType } from "@/types/common.type";
import { create } from "zustand";

interface MyRatingsFiltersState {
  isOpen: boolean;
  mediaType: MediaType;
  // Discover page filters
}

export const useMyRatingsFiltersStore = create<MyRatingsFiltersState>(() => ({
  isOpen: false,
  mediaType: "movies",
  //  Discover page filters
}));

export const setType = (mediaType: MediaType) =>
  useMyRatingsFiltersStore.setState({ mediaType });

export const setIsOpen = (isOpen: boolean) =>
  useMyRatingsFiltersStore.setState({ isOpen });
