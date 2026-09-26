import { api } from "@/lib/axios";
import { MediaType, SortType } from "@/types/common.type";
import { RatedMoviesResponse } from "@/types/movie-types";
import { RatedTVShowsResponse } from "@/types/tv-shows-type";
import { useQuery } from "@tanstack/react-query";

async function queryFn(
  mediaType: MediaType,
  sort: SortType,
): Promise<RatedMoviesResponse | RatedTVShowsResponse> {
  const { data } = await api.get(
    `account/23515191/rated/${mediaType}?sort_by=created_at.${sort}`,
  );

  return data;
}

export function useGetMyRatings(mediaType: MediaType, sort: SortType) {
  return useQuery({
    queryKey: ["my-ratings", mediaType, sort],
    queryFn: () => queryFn(mediaType, sort),
  });
}
