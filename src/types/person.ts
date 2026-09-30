/**
 * TMDB person types: summaries, movie/TV credits and person details.
 *
 * Endpoints covered:
 *  - GET /person/{person_id}?append_to_response=combined_credits -> PersonDetails
 *  - cast/crew entries of /movie/{id}/credits and /tv/{id}/aggregate_credits
 *
 * Reference: https://developer.themoviedb.org/reference/person-details
 *
 * This file has no dependencies on the movie/tv/search types.
 */

/* -------------------------------------------------------------------------- */
/*  Enums                                                                     */
/* -------------------------------------------------------------------------- */

/** 0 = Not specified, 1 = Female, 2 = Male, 3 = Non-binary (per TMDB convention) */
export type Gender = 0 | 1 | 2 | 3;

export type KnownForDepartment =
  | "Acting"
  | "Directing"
  | "Production"
  | "Writing"
  | "Editing"
  | "Sound"
  | "Camera"
  | "Art"
  | "Costume & Make-Up"
  | "Crew"
  | "Visual Effects"
  | "Lighting"
  | (string & {}); // fallback for any other department TMDB returns

/* -------------------------------------------------------------------------- */
/*  Person summary + movie/TV credits                                         */
/* -------------------------------------------------------------------------- */

export type PersonSummary = {
  adult: boolean;
  gender: Gender;
  id: number;
  known_for_department: KnownForDepartment;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

/** Cast entry of GET /movie/{id}/credits */
export type CastMember = PersonSummary & {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

/** Crew entry of GET /movie/{id}/credits */
export type CrewMember = PersonSummary & {
  credit_id: string;
  department: string;
  job: string;
};

/** Cast entry of GET /tv/{id}/aggregate_credits */
export type AggregateCastMember = PersonSummary & {
  roles: { credit_id: string; character: string; episode_count: number }[];
  total_episode_count: number;
  order: number;
};

/** Crew entry of GET /tv/{id}/aggregate_credits */
export type AggregateCrewMember = PersonSummary & {
  department: string;
  jobs: { credit_id: string; job: string; episode_count: number }[];
  total_episode_count: number;
};

/* -------------------------------------------------------------------------- */
/*  Combined credits (person -> titles)                                       */
/* -------------------------------------------------------------------------- */

/**
 * Fields shared by every entry of `combined_credits`. Movie-only and TV-only
 * fields are optional since each entry is one or the other (see `media_type`).
 */
type CombinedCreditBase = {
  id: number;
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
  media_type: "movie" | "tv";
  credit_id: string;
  episode_count?: number;

  // movie-only
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;

  // tv-only
  name?: string;
  original_name?: string;
  first_air_date?: string; // "" if unknown
  origin_country?: string[];
};

/** A cast credit (person acted in the title) */
export type CombinedCastCredit = CombinedCreditBase & {
  character: string;
  order?: number;
};

/** A crew credit (person worked behind the scenes on the title) */
export type CombinedCrewCredit = CombinedCreditBase & {
  department: string;
  job: string;
};

/** The object returned for "combined_credits" (append_to_response) */
export type PersonCombinedCredits = {
  cast: CombinedCastCredit[];
  crew: CombinedCrewCredit[];
  id?: number; // TMDB includes this on the appended sub-object
};

/* -------------------------------------------------------------------------- */
/*  GET /person/{person_id}                                                   */
/* -------------------------------------------------------------------------- */

/** Full response shape for GET /person/{person_id}?append_to_response=combined_credits */
export type PersonDetails = Omit<PersonSummary, "original_name"> & {
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string | null;
  imdb_id: string | null;
  place_of_birth: string | null;

  /** Present because of ?append_to_response=combined_credits */
  combined_credits: PersonCombinedCredits;
};
