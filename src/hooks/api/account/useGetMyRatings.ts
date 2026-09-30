import { api } from "@/lib/axios";
import { MediaType, SortType } from "@/types/common.type";
import { RatedMoviesResponse } from "@/types/movie-types";
import { RatedTVShowsResponse } from "@/types/tv-shows-type";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

type MyRatingsResponse = RatedMoviesResponse | RatedTVShowsResponse;

async function queryFn(
  mediaType: MediaType,
  sort: SortType,
  pageParam: number,
): Promise<MyRatingsResponse> {
  const { data } = await api.get<MyRatingsResponse>(
    `account/23515191/rated/${mediaType}`,
    {
      params: {
        sort_by: `created_at.${sort}`,
        page: pageParam,
      },
    },
  );

  return data;
}

export function useGetMyRatings(mediaType: MediaType, sort: SortType) {
  return useInfiniteQuery<
    MyRatingsResponse,
    Error,
    InfiniteData<MyRatingsResponse>,
    unknown[],
    number
  >({
    queryKey: ["my-ratings", mediaType, sort],
    queryFn: ({ pageParam = 1 }) => queryFn(mediaType, sort, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
}
