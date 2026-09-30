import { api } from "@/lib/axios";
import { FiltersType } from "@/stores/useFiltersStore";
import { SortState } from "@/stores/useSortingStore";
import { MediaType } from "@/types/common";
import { MovieListResponse } from "@/types/movie";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

export function useGetDiscoverMovie(
  type: MediaType,
  params: FiltersType,
  sort: SortState,
) {
  return useInfiniteQuery<
    MovieListResponse, // TQueryFnData: Return type of your queryFn for a single page
    Error, // TError: Error type
    InfiniteData<MovieListResponse>, // TData: Shape of query.data
    unknown[], // TQueryKey: Query key tuple type
    number // TPageParam: Type of pageParam passed to queryFn
  >({
    queryKey: ["discover-movie", type, params, sort],
    queryFn: async ({ pageParam }) => {
      const countries = params.countries.map((c) => c.value).join("|");
      const genres = params.genres.map((g) => g.value).join(",");

      // Empty/undefined values are left out of the request entirely
      const { data } = await api.get<MovieListResponse>("discover/movie", {
        params: {
          "vote_average.gte": params.minRating || undefined,
          "vote_average.lte": params.maxRating || undefined,
          "primary_release_date.gte": params.minYear
            ? `${params.minYear}-01-01`
            : undefined,
          "primary_release_date.lte": params.maxYear
            ? `${params.maxYear}-12-31`
            : undefined,
          with_genres: genres || undefined,
          with_origin_country: countries || undefined,
          sort_by: `${sort.sortBy}.${sort.orderBy}`,
          "vote_count.gte": 100,
          page: pageParam,
        },
      });

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
