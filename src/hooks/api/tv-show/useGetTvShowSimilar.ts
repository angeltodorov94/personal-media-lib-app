import { api } from "@/lib/axios";
import { TVListResponse } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<TVListResponse> {
  const { data } = await api.get<TVListResponse>(`tv/${id}/similar`);

  return data;
}

export function useGetTvShowSimilar(id: string, enabled: boolean = false) {
  return useQuery({
    queryKey: ["tv-show-similar", id],
    queryFn: () => queryFn(id),
    enabled,
  });
}
