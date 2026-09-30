import { api } from "@/lib/axios";
import { TrendingMoviesResponse } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

async function queryFn(): Promise<TrendingMoviesResponse> {
  const { data } = await api.get<TrendingMoviesResponse>(`trending/movie/week`);

  return data;
}

export function useGetTrendingMovies() {
  return useQuery({
    queryKey: ["trending-movies"],
    queryFn,
  });
}
