import { api } from "@/lib/axios";
import { TVSimilarResponse } from "@/types/tv-shows-type";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<TVSimilarResponse> {
  const { data } = await api.get(`tv/${id}/similar`);

  return data;
}

export function useGetTvShowSimilar(id: string, enabled: boolean = false) {
  return useQuery({
    queryKey: ["tv-show-similar", id],
    queryFn: () => queryFn(id),
    enabled,
  });
}
