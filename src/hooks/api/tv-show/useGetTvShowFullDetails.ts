import { api } from "@/lib/axios";
import { SESSION_TOKEN } from "@/lib/constants";
import { AggregateCrewMember } from "@/types/person";
import { TVSeriesDetailsWithExtras } from "@/types/tv";
import { useQuery } from "@tanstack/react-query";
import { CREW_JOBS } from "../movie/useGetMovieFullDetails";

// TMDB returns one aggregate crew entry per person per department, so the
// same person can appear several times; fold their jobs into a single entry
function mergeCrewByPerson(crew: AggregateCrewMember[]): AggregateCrewMember[] {
  const merged = new Map<number, AggregateCrewMember>();

  for (const member of crew) {
    const existing = merged.get(member.id);

    merged.set(
      member.id,
      existing
        ? {
            ...existing,
            jobs: [
              ...existing.jobs,
              ...member.jobs.filter(
                (j) => !existing.jobs.some((e) => e.job === j.job),
              ),
            ],
          }
        : member,
    );
  }

  return [...merged.values()];
}

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
    crew: mergeCrewByPerson(data.aggregate_credits.crew)
      .map((c) => ({
        ...c,
        jobs: c.jobs.filter((j) => CREW_JOBS.includes(j.job)),
      }))
      .filter((c) => c.jobs.length > 0)
      .sort((a, b) => b.popularity - a.popularity),
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
    queryKey: ["tv-show-details", id],
    queryFn: () => queryFn(id),
    select,
  });
}
