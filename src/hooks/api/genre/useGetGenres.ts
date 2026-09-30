import { api } from "@/lib/axios";
import { GenreListResponse } from "@/types/common";
import { useQuery } from "@tanstack/react-query";

async function queryFn(type: "movie" | "tv"): Promise<GenreListResponse> {
  const { data } = await api.get<GenreListResponse>(`genre/${type}/list`, {
    params: { language: "en" },
  });

  return data;
}

export function useGetGenres(type: "movie" | "tv") {
  return useQuery({
    queryKey: ["genres", type],
    queryFn: () => queryFn(type),
    staleTime: Infinity,
    gcTime: Infinity,
  });
}
