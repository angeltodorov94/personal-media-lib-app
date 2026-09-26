import { SortType } from "@/types/common.type";
import { create } from "zustand";

interface MyRatingsSortingState {
  sortType: SortType;
}

export const useMyRatingsSortingStore = create<MyRatingsSortingState>(() => ({
  sortType: "desc",
}));

export const setSortType = (sortType: SortType) =>
  useMyRatingsSortingStore.setState({ sortType });
