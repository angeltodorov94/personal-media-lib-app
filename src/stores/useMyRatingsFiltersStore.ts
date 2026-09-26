import { MediaType } from "@/types/common.type";
import { create } from "zustand";

interface MyRatingsFiltersState {
  isOpen: boolean;
  mediaType: MediaType;
}

export const useMyRatingsFiltersStore = create<MyRatingsFiltersState>(() => ({
  isOpen: false,
  mediaType: "movies",
}));

export const setType = (mediaType: MediaType) =>
  useMyRatingsFiltersStore.setState({ mediaType });

export const setIsOpen = (isOpen: boolean) =>
  useMyRatingsFiltersStore.setState({ isOpen });
