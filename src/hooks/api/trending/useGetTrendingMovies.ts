import { api } from "@/lib/axios";
import { TradingMoviesResponse } from "@/types/movie-types";
import { useQuery } from "@tanstack/react-query";

async function queryFn(): Promise<TradingMoviesResponse> {
  const { data } = await api.get(`trending/movie/week`);

  return data;
}

export function useGetTrendingMovies() {
  return useQuery({
    queryKey: ["trending-movies"],
    queryFn,
  });
}
