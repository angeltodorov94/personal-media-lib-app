import { api } from "@/lib/axios";
import { MovieListResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<MovieListResponse> {
  const { data } = await api.get<MovieListResponse>(`movie/${id}/similar`);

  return data;
}

export function useGetMovieSimilar(id: string, enabled: boolean = false) {
  return useQuery({
    queryKey: ["movie-similar", id],
    queryFn: () => queryFn(id),
    enabled,
  });
}
