import { SortType } from "@/types/common";
import { create } from "zustand";

export const sortingFields: {
  value: SortField;
  label: string;
}[] = [
  { value: "popularity", label: "Popularity" },
  { value: "title", label: "Alphabetically" },
  { value: "primary_release_date", label: "Release Date" },
  { value: "vote_count", label: "Vote Count" },
  { value: "vote_average", label: "User Score" },
];

export const sortingOrder: {
  value: SortType;
  label: string;
}[] = [
  { value: "asc", label: "Asc" },
  { value: "desc", label: "Desc" },
];

export type SortField =
  | "popularity"
  | "vote_average"
  | "vote_count"
  | "primary_release_date"
  | "title";

export const initSortingState: SortState = {
  sortBy: "popularity",
  orderBy: "desc",
};

export type SortState = {
  sortBy: SortField;
  orderBy: SortType;
};

interface MyRatingsSortingState {
  isDiscoverSortPanelOpen: boolean;
  discoverSortPanel: SortState;
  //
  isRatingsSortPanelOpen: boolean;
  ratingsSortPanel: SortState;
}

export const useSortingStore = create<MyRatingsSortingState>(() => ({
  isRatingsSortPanelOpen: false,
  ratingsSortPanel: initSortingState,
  isDiscoverSortPanelOpen: false,
  discoverSortPanel: initSortingState,
}));

export const setIsSortingPanelOpen = (
  type: "discover" | "ratings",
  isOpen: boolean,
) => {
  switch (type) {
    case "discover":
      useSortingStore.setState({
        isDiscoverSortPanelOpen: isOpen,
      });
      break;
    case "ratings":
      useSortingStore.setState({
        isRatingsSortPanelOpen: isOpen,
      });
      break;
  }
};

export const setSorting = (type: "discover" | "ratings", state: SortState) => {
  switch (type) {
    case "discover":
      useSortingStore.setState({
        discoverSortPanel: state,
        isDiscoverSortPanelOpen: false,
      });
      break;
    case "ratings":
      useSortingStore.setState({
        ratingsSortPanel: state,
        isRatingsSortPanelOpen: false,
      });
      break;
  }
};

export const clearSorting = (type: "discover" | "ratings") => {
  switch (type) {
    case "discover":
      useSortingStore.setState({
        isDiscoverSortPanelOpen: false,
        discoverSortPanel: initSortingState,
      });
      break;
    case "ratings":
      useSortingStore.setState({
        isRatingsSortPanelOpen: false,
        ratingsSortPanel: initSortingState,
      });
      break;
  }
};
