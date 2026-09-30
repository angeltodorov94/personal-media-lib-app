import { OptionType } from "@/components/ui/combobox";
import { MediaType } from "@/types/common";
import { create } from "zustand";

export type FiltersType = {
  minRating: string | undefined;
  maxRating: string | undefined;
  minYear: string | undefined;
  maxYear: string | undefined;
  countries: OptionType[];
  genres: OptionType[];
};

export const initFilterState: FiltersType = {
  minRating: "",
  maxRating: "",
  minYear: "",
  maxYear: "",
  countries: [],
  genres: [],
};

interface MyRatingsFiltersState {
  discoverScreenMediaType: MediaType;
  ratingsScreenMediaType: MediaType;
  isDiscoverFilterPanelOpen: boolean;
  isRatingsFilterPanelOpen: boolean;
  // Ratings page filters
  ratingsScreenFilters: FiltersType;
  // Discover page filters
  discoverScreenFilters: FiltersType;
}

export const useFiltersStore = create<MyRatingsFiltersState>(() => ({
  discoverScreenMediaType: "movies",
  ratingsScreenMediaType: "movies",
  isDiscoverFilterPanelOpen: false,
  isRatingsFilterPanelOpen: false,
  //  Discover page filters
  ratingsScreenFilters: initFilterState,
  // Discover page filters
  discoverScreenFilters: initFilterState,
}));

export const setFilterMediaType = (
  type: "discover" | "ratings",
  media: MediaType,
) => {
  switch (type) {
    case "discover":
      useFiltersStore.setState({
        discoverScreenMediaType: media,
      });
      break;
    case "ratings":
      useFiltersStore.setState({
        ratingsScreenMediaType: media,
      });
      break;
  }
};

export const setIsFilterPanelOpen = (
  type: "discover" | "ratings",
  isOpen: boolean,
) => {
  switch (type) {
    case "discover":
      useFiltersStore.setState({
        isDiscoverFilterPanelOpen: isOpen,
      });
      break;
    case "ratings":
      useFiltersStore.setState({
        isRatingsFilterPanelOpen: isOpen,
      });
      break;
  }
};

export const setFilters = (
  type: "discover" | "ratings",
  state: FiltersType,
) => {
  switch (type) {
    case "discover":
      useFiltersStore.setState({
        discoverScreenFilters: state,
        isDiscoverFilterPanelOpen: false,
      });
      break;
    case "ratings":
      useFiltersStore.setState({
        ratingsScreenFilters: state,
        isRatingsFilterPanelOpen: false,
      });
      break;
  }
};

export const clearFilters = (type: "discover" | "ratings") => {
  switch (type) {
    case "discover":
      useFiltersStore.setState({
        discoverScreenFilters: initFilterState,
        isDiscoverFilterPanelOpen: false,
      });
      break;
    case "ratings":
      useFiltersStore.setState({
        ratingsScreenFilters: initFilterState,
        isRatingsFilterPanelOpen: false,
      });
      break;
  }
};
