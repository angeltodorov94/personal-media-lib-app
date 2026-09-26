import { api } from "@/lib/axios";
import { TVRecommendationsResponse } from "@/types/tv-shows-type";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<TVRecommendationsResponse> {
  const { data } = await api.get(`tv/${id}/recommendations`);

  return data;
}

export function useGetTvShowRecommendations(
  id: string,
  enabled: boolean = false,
) {
  return useQuery({
    queryKey: ["tv-show-recommendations", id],
    queryFn: () => queryFn(id),
    enabled,
  });
}
