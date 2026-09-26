import { api } from "@/lib/axios";
import { MovieRecommendationsResponse } from "@/types/movie-types";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<MovieRecommendationsResponse> {
  const { data } = await api.get(`movie/${id}/recommendations`);

  return data;
}

export function useGetMovieRecommendations(
  id: string,
  enabled: boolean = false,
) {
  return useQuery({
    queryKey: ["movie-recommendations", id],
    queryFn: () => queryFn(id),
    enabled,
  });
}
