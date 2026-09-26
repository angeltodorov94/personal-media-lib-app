/**
 * TypeScript types for The Movie Database (TMDB) API v3
 * Endpoints covered:
 *  - GET /movie/{movie_id}                 -> MovieDetails
 *  - GET /movie/{movie_id}/account_states   -> MovieAccountStates
 *  - GET /movie/{movie_id}/credits          -> MovieCredits
 *  - GET /movie/{movie_id}/keywords         -> MovieKeywords
 *  - GET /movie/{movie_id}/similar          -> MovieSimilarResponse
 *  - GET /movie/{movie_id}/recommendations  -> MovieRecommendationsResponse
 *
 * Reference: https://developer.themoviedb.org/reference/movie-details
 */

import {
  AccountStates,
  Genre,
  Keyword,
  PaginatedResponse,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "./common.type";
import { CastMember, CrewMember } from "./person-types";

/* -------------------------------------------------------------------------- */
/*  Shared / building-block types                                             */
/* -------------------------------------------------------------------------- */

export interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
}

/**
 * Condensed movie shape returned in list-style endpoints
 * (similar, recommendations, search, discover, etc).
 */
export interface MovieSummary {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/* -------------------------------------------------------------------------- */
/*  GET /movie/{movie_id}                                                     */
/* -------------------------------------------------------------------------- */

export interface MovieDetails {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  /** ISO 3166-1 country codes, only present when not using append_to_response tricks on older API versions */
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string | null;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  /** YYYY-MM-DD, can be an empty string if unknown */
  release_date: string;
  revenue: number;
  /** minutes; null/0 if unknown */
  runtime: number | null;
  spoken_languages: SpokenLanguage[];
  status:
    | "Rumored"
    | "Planned"
    | "In Production"
    | "Post Production"
    | "Released"
    | "Canceled";
  tagline: string | null;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

/* -------------------------------------------------------------------------- */
/*  GET /movie/{movie_id}/credits                                             */
/* -------------------------------------------------------------------------- */

export interface MovieCredits {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
}

/* -------------------------------------------------------------------------- */
/*  GET /movie/{movie_id}/keywords                                            */
/* -------------------------------------------------------------------------- */

export interface MovieKeywords {
  id: number;
  keywords: Keyword[];
}

/* -------------------------------------------------------------------------- */
/*  GET /movie/{movie_id}/similar                                             */
/*  GET /movie/{movie_id}/recommendations                                     */
/* -------------------------------------------------------------------------- */

export type MovieSimilarResponse = PaginatedResponse<MovieSummary>;
export type MovieRecommendationsResponse = PaginatedResponse<MovieSummary>;

/* -------------------------------------------------------------------------- */
/*  GET /account/{account_id}/rated/movies                                    */
/* -------------------------------------------------------------------------- */

export type RatedMovie = MovieSummary & { rating: number };
export type RatedMoviesResponse = PaginatedResponse<RatedMovie>;

/* -------------------------------------------------------------------------- */
/*  GET /trending/movie/{time_window}                                         */
/* -------------------------------------------------------------------------- */

export type TradingMovie = MovieSummary & { media_type: string };
export type TradingMoviesResponse = PaginatedResponse<TradingMovie>;

/**
 * Shape of the response when chaining details with account_states, credits
 * and keywords via `append_to_response`. Each appended endpoint's response
 * is merged in as a top-level key, named after the endpoint itself (its own
 * `id` field is redundant but TMDB still sends it).
 *
 * Example request:
 *   GET /movie/{movie_id}?append_to_response=account_states,credits,keywords&session_id=...
 */
export type MovieDetailsWithExtras = MovieDetails & {
  account_states: AccountStates;
  credits: MovieCredits;
  keywords: MovieKeywords;
};
