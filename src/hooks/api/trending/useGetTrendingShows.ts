import { api } from "@/lib/axios";
import { TradingTVShowsResponse } from "@/types/tv-shows-type";
import { useQuery } from "@tanstack/react-query";

async function queryFn(): Promise<TradingTVShowsResponse> {
  const { data } = await api.get(`trending/tv/week`);

  return data;
}

export function useGetTrendingShows() {
  return useQuery({
    queryKey: ["trending-shows"],
    queryFn,
  });
}
