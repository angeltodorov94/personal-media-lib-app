import { api } from "@/lib/axios";
import { TmdbPersonDetails } from "@/types/person-full-details";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<TmdbPersonDetails> {
  const { data } = await api.get(
    `person/${id}?append_to_response=combined_credits&language=en-US'`,
  );

  return data;
}

export function useGetPersonFullDetails(id: string) {
  return useQuery({
    queryKey: ["person-details", id],
    queryFn: () => queryFn(id),
  });
}
