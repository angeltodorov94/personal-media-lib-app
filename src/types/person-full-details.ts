/**
 * TypeScript types for the TMDB "Person Details" endpoint
 * GET https://api.themoviedb.org/3/person/{person_id}?append_to_response=combined_credits
 *
 * Reference: https://developer.themoviedb.org/reference/person-details
 */

import { TradingMovie } from "./movie-types";

/** 1 = Not specified, 2 = Male, 3 = Female, 4 = Non-binary (per TMDB convention) */
export type TmdbGender = 0 | 1 | 2 | 3;

export type TmdbKnownForDepartment =
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

/** Base fields shared by both movie and TV credit entries in combined_credits */
interface TmdbCombinedCreditBase {
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
}

export interface TmdbCombinedTvCredit extends TmdbCombinedCreditBase {
  media_type: "tv";
  name: string;
  original_name: string;
  first_air_date: string; // "" if unknown
  origin_country: string[];
  episode_count?: number;
}

export type TmdbCombinedCredit = TradingMovie | TmdbCombinedTvCredit;

/** A cast credit (person acted in the title) */
export interface TmdbCombinedCastCredit extends TmdbCombinedCreditBase {
  media_type: "movie" | "tv";
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  character: string;
  credit_id: string;
  order?: number;
  episode_count?: number;
}

/** A crew credit (person worked behind the scenes on the title) */
export interface TmdbCombinedCrewCredit extends TmdbCombinedCreditBase {
  media_type: "movie" | "tv";
  title?: string;
  original_title?: string;
  release_date?: string;
  video?: boolean;
  name?: string;
  original_name?: string;
  first_air_date?: string;
  origin_country?: string[];
  credit_id: string;
  department: string;
  job: string;
  episode_count?: number;
}

/** The object returned for "combined_credits" (append_to_response) */
export interface TmdbPersonCombinedCredits {
  cast: TmdbCombinedCastCredit[];
  crew: TmdbCombinedCrewCredit[];
  id?: number; // TMDB includes this on the appended sub-object
}

/** Full response shape for GET /person/{person_id}?append_to_response=combined_credits */
export interface TmdbPersonDetails {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: TmdbGender;
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  known_for_department: TmdbKnownForDepartment;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;

  /** Present because of ?append_to_response=combined_credits */
  combined_credits: TmdbPersonCombinedCredits;
}
