import { api } from "@/lib/axios";
import { SESSION_TOKEN } from "@/lib/constants";
import { TVSeriesDetailsWithExtras } from "@/types/tv-shows-type";
import { useQuery } from "@tanstack/react-query";

async function queryFn(id: string): Promise<TVSeriesDetailsWithExtras> {
  const { data } = await api.get(
    `tv/${id}?append_to_response=account_states,aggregate_credits,external_ids,keywords&session_id=${SESSION_TOKEN}`,
  );

  return data;
}

export function useGetTvShowFullDetails(id: string) {
  return useQuery({
    queryKey: ["tv-show-details", id],
    queryFn: () => queryFn(id),
  });
}
