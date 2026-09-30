import { api } from "@/lib/axios";
import { TMDBSearchMultiResponse } from "@/types/search-types";
import { useInfiniteQuery } from "@tanstack/react-query";

async function queryFn(
  search: string,
  page = 1,
): Promise<TMDBSearchMultiResponse> {
  const { data } = await api.get(
    `search/multi?query=${encodeURIComponent(
      search,
    )}&include_adult=false&language=en-US&page=${page}`,
  );

  return data;
}

export function useGetMultiSearch(search: string) {
  return useInfiniteQuery({
    queryKey: ["search", "multi", search],
    queryFn: ({ pageParam }) => queryFn(search, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    // Optional tuning:
    staleTime: 0,
    // maxPages: 5, // cap how many pages are kept in memory
    enabled: search.trim().length > 0,
  });
}
