import { api } from "@/lib/axios";
import {
  CombinedCastCredit,
  CombinedCrewCredit,
  PersonDetails,
} from "@/types/person";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

type Credit = CombinedCastCredit | CombinedCrewCredit;

export type CreditSortField =
  | "popularity"
  | "vote_average"
  | "vote_count"
  | "release_date";

// TMDB sends "" (or omits the field) when the date is unknown
const getDate = (credit: Credit) =>
  (credit.media_type === "tv" ? credit.first_air_date : credit.release_date) ??
  "";

// Highest/newest first. ISO dates (YYYY-MM-DD) sort correctly as plain strings.
const compare = (a: Credit, b: Credit, field: CreditSortField) =>
  field === "release_date"
    ? getDate(b).localeCompare(getDate(a))
    : b[field] - a[field];

// Only dated movies/TV shows. filter() returns a new array, so the sort in
// sortCredits never mutates the cached data.
const cleanCredits = <T extends Credit>(credits: T[]): T[] =>
  credits.filter(
    (c) =>
      (c.media_type === "movie" || c.media_type === "tv") &&
      getDate(c) &&
      c.poster_path &&
      !(c.vote_average >= 1 && c.vote_average < 5) &&
      c.genre_ids.length > 0,
  );

// TMDB's "Talk" and "News" TV genres. Guest spots and appearances on these
// shows come back as cast credits (character "Self", "Self - Guest", ...), so
// every cast credit on a show with either genre is dropped.
const TALK_GENRE_ID = 10767;
const NEWS_GENRE_ID = 10763;

const cleanCast = (credits: CombinedCastCredit[]) =>
  cleanCredits(credits).filter(
    (c) =>
      !(
        c.media_type === "tv" &&
        (c.genre_ids.includes(TALK_GENRE_ID) ||
          c.genre_ids.includes(NEWS_GENRE_ID))
      ),
  );

// A person can have several crew credits on one title (Director, Writer, ...).
// Movie and TV ids can collide, so the media type is part of the key.
const mergeCrew = (credits: CombinedCrewCredit[]): CombinedCrewCredit[] => {
  const merged = new Map<string, CombinedCrewCredit>();

  for (const credit of credits) {
    const key = `${credit.media_type}-${credit.id}`;
    const existing = merged.get(key);

    if (!existing) {
      merged.set(key, credit);
    } else if (!existing.job.split(" / ").includes(credit.job)) {
      merged.set(key, { ...existing, job: `${existing.job} / ${credit.job}` });
    }
  }

  return [...merged.values()];
};

// Sorts in place, so only pass it the fresh array from cleanCredits.
const sortCredits = <T extends Credit>(
  credits: T[],
  sortBy: CreditSortField,
): T[] => credits.sort((a, b) => compare(a, b, sortBy));

async function queryFn(id: string): Promise<PersonDetails> {
  const { data } = await api.get<PersonDetails>(`person/${id}`, {
    params: {
      append_to_response: "combined_credits",
      language: "en-US",
    },
  });

  return data;
}

type CreditSorts = {
  cast?: CreditSortField;
  crew?: CreditSortField;
};

export function useGetPersonFullDetails(
  id: string,
  {
    cast: castSortBy = "release_date",
    crew: crewSortBy = "vote_count",
  }: CreditSorts = {},
) {
  // Sorting is client-side, so it stays out of the queryKey: changing it
  // re-runs select on the cached data instead of refetching.
  const select = useCallback(
    (data: PersonDetails): PersonDetails => ({
      ...data,
      combined_credits: {
        ...data.combined_credits,
        cast: sortCredits(cleanCast(data.combined_credits.cast), castSortBy),
        crew: sortCredits(
          mergeCrew(cleanCredits(data.combined_credits.crew)),
          crewSortBy,
        ),
      },
    }),
    [castSortBy, crewSortBy],
  );

  return useQuery({
    queryKey: ["person-details", id],
    queryFn: () => queryFn(id),
    select,
  });
}
