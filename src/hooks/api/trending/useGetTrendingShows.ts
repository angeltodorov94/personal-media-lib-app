import { api } from "@/lib/axios";
import { TrendingTVShowsResponse } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";

async function queryFn(): Promise<TrendingTVShowsResponse> {
  const { data } = await api.get<TrendingTVShowsResponse>(`trending/tv/week`);

  return data;
}

export function useGetTrendingShows() {
  return useQuery({
    queryKey: ["trending-shows"],
    queryFn,
  });
}
