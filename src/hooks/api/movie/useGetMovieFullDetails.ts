import { api } from "@/lib/axios";
import { SESSION_TOKEN } from "@/lib/constants";
import { mergeDuplicatePeople } from "@/lib/mergeDuplicatePeople";
import { MovieDetailsWithExtras } from "@/types/movie";
import { useQuery } from "@tanstack/react-query";

export const CREW_JOBS = [
  "Director",
  "Screenplay",
  "Writer",
  "Producer",
  "Executive Producer",
];

// Returns a new object so the cached query data is never mutated
const select = (data: MovieDetailsWithExtras): MovieDetailsWithExtras => ({
  ...data,
  credits: {
    ...data.credits,
    crew: mergeDuplicatePeople(
      data.credits.crew.filter(
        (c) => CREW_JOBS.includes(c.job) && c.popularity >= 1 && c.profile_path,
      ),
      "job",
    ),
    cast: data.credits.cast.filter(
      (c) => c.profile_path && !c.character.includes("uncredited"),
    ),
  },
});

async function queryFn(id: string): Promise<MovieDetailsWithExtras> {
  const { data } = await api.get<MovieDetailsWithExtras>(`movie/${id}`, {
    params: {
      append_to_response: "account_states,credits,keywords",
      session_id: SESSION_TOKEN,
    },
  });

  return data;
}

export function useGetMovieFullDetails(id: string) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => queryFn(id),
    select,
  });
}
