import { api } from "@/lib/axios";
import { queryKeys } from "@/lib/queryKeys";
import { MediaType, SortType } from "@/types/common";
import { RatedMediaResponse } from "@/types/rating";
import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

async function queryFn(
  mediaType: MediaType,
  sort: SortType,
  pageParam: number,
): Promise<RatedMediaResponse> {
  const { data } = await api.get<RatedMediaResponse>(
    `account/${process.env.EXPO_PUBLIC_ACCOUNT_ID}/rated/${mediaType}`,
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
    RatedMediaResponse,
    Error,
    InfiniteData<RatedMediaResponse>,
    unknown[],
    number
  >({
    queryKey: [...queryKeys.myRatings, mediaType, sort],
    queryFn: ({ pageParam }) => queryFn(mediaType, sort, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
  });
}
