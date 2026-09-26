import { api } from "@/lib/axios";
import { MovieSimilarResponse } from "@/types/movie-types";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<MovieSimilarResponse> {
  const { data } = await api.get(`movie/${id}/similar`);

  return data;
}

export function useGetMovieSimilar(id: string, enabled: boolean = false) {
  return useQuery({
    queryKey: ["movie-similar", id],
    queryFn: () => queryFn(id),
    enabled,
  });
}
