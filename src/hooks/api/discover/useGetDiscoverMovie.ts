import { api } from "@/lib/axios";
import { FiltersType } from "@/stores/useFiltersStore";
import { SortState } from "@/stores/useSortingStore";
import { MediaType } from "@/types/common.type";
import { MovieDiscoverResponse } from "@/types/movie-types";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export function useGetDiscoverMovie(
  type: MediaType,
  params: FiltersType,
  sort: SortState,
) {
  return useInfiniteQuery<
    MovieDiscoverResponse, // TQueryFnData: Return type of your queryFn for a single page
    Error, // TError: Error type
    InfiniteData<MovieDiscoverResponse>, // TData: Shape of query.data
    unknown[], // TQueryKey: Query key tuple type
    number
  >({
    // TPageParam: Type of pageParam passed to queryFn>
    queryKey: ["discover-movie", params, sort],
    queryFn: async ({ pageParam }) => {
      const countries = params.countries.map((c) => c.value).join("|");
      const genres = params.genres.map((g) => g.value).join(",");

      const url = `discover/movie?vote_average.gte=${params.minRating}&vote_average.lte=${params.maxRating}&primary_release_date.gte=${params.minYear && params.minYear + "-01-01"}&primary_release_date.lte=${params.maxYear && params.maxYear + "-12-31"}&with_genres=${genres}&with_origin_country=${countries}&sort_by=${sort.sortBy}.${sort.orderBy}&vote_count.gte=100&page=${pageParam}`;
      const { data } = await api.get(url);

      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    // Optional tuning:
    staleTime: 0,
    // maxPages: 5, // cap how many pages are kept in memory
    enabled: type === "movies",
  });
}
