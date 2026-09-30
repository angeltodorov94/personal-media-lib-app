import { api } from "@/lib/axios";
import { TVListResponse } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<TVListResponse> {
  const { data } = await api.get<TVListResponse>(`tv/${id}/recommendations`);

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
