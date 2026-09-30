import { api } from "@/lib/axios";
import { MovieListResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<MovieListResponse> {
  const { data } = await api.get<MovieListResponse>(`movie/${id}/recommendations`);

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
