import { api } from "@/lib/axios";
import { SESSION_TOKEN } from "@/lib/constants";
import { MovieDetailsWithExtras } from "@/types/movie-types";
import { useQuery } from "@tanstack/react-query";

const jobs = [
  "Director",
  "Screenplay",
  "Writer",
  "Producer",
  "Executive Producer",
];

const select = (data: MovieDetailsWithExtras): MovieDetailsWithExtras => {
  data.credits.crew = data.credits.crew.filter(
    (c) => jobs.includes(c.job) && c.popularity >= 1 && c.profile_path,
  );

  data.credits.cast = data.credits.cast.filter(
    (c) => c.profile_path && !c.character.includes("uncredited"),
  );

  return data;
};

async function queryFn(id: string): Promise<MovieDetailsWithExtras> {
  const { data } = await api.get(
    `movie/${id}?append_to_response=account_states,credits,keywords&session_id=${SESSION_TOKEN}`,
  );

  return data;
}

export function useGetMovieFullDetails(id: string) {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => queryFn(id),
    select,
  });
}
