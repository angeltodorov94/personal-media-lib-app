import { api } from "@/lib/axios";
import { SESSION_TOKEN } from "@/lib/constants";
import { queryKeys } from "@/lib/queryKeys";
import { TVSeriesDetailsWithExtras } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";

// Returns a new object so the cached query data is never mutated
const select = (
  data: TVSeriesDetailsWithExtras,
): TVSeriesDetailsWithExtras => ({
  ...data,
  aggregate_credits: {
    ...data.aggregate_credits,
    cast: data.aggregate_credits.cast.filter(
      (c) =>
        c.profile_path &&
        !c.roles.some((r) => r.character.includes("uncredited")),
    ),
  },
});

async function queryFn(id: string): Promise<TVSeriesDetailsWithExtras> {
  const { data } = await api.get<TVSeriesDetailsWithExtras>(`tv/${id}`, {
    params: {
      append_to_response:
        "account_states,aggregate_credits,external_ids,keywords",
      session_id: SESSION_TOKEN,
    },
  });

  return data;
}

export function useGetTvShowFullDetails(id: string) {
  return useQuery({
    queryKey: queryKeys.tvShowDetails(id),
    queryFn: () => queryFn(id),
    select,
  });
}
