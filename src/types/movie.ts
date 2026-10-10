/**
 * TMDB API v3 movie types.
 *
 * Endpoints covered:
 *  - GET /movie/{movie_id}                  -> MovieDetails
 *  - GET /movie/{movie_id}/credits          -> MovieCredits
 *  - GET /movie/{movie_id}/keywords         -> MovieKeywords
 *  - GET /movie/{movie_id}/recommendations  -> MovieListResponse
 *  - GET /discover/movie                    -> MovieListResponse
 *  - GET /account/{account_id}/rated/movies -> RatedMoviesResponse
 *  - GET /trending/movie/{time_window}      -> TrendingMoviesResponse
 *
 * Reference: https://developer.themoviedb.org/reference/movie-details
 */

import {
  AccountStates,
  Genre,
  Keyword,
  MediaSummaryBase,
  PaginatedResponse,
  ProductionCompany,
  ProductionCountry,
  SpokenLanguage,
} from "./common";
import { CastMember, CrewMember } from "./person";

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                           */
/* -------------------------------------------------------------------------- */

export type BelongsToCollection = {
  id: number;
  name: string;
  poster_path: string | null;
  backdrop_path: string | null;
};

/** Condensed movie shape returned in list-style endpoints. */
export type MovieSummary = MediaSummaryBase & {
  original_title: string;
  release_date: string;
  title: string;
  video: boolean;
};

/* -------------------------------------------------------------------------- */
/*  GET /movie/{movie_id}                                                     */
/* -------------------------------------------------------------------------- */

export type MovieDetails = {
  adult: boolean;
  backdrop_path: string | null;
  belongs_to_collection: BelongsToCollection | null;
  budget: number;
  genres: Genre[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  /** ISO 3166-1 country codes */
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
};

/* -------------------------------------------------------------------------- */
/*  Appended sub-resources                                                    */
/* -------------------------------------------------------------------------- */

export type MovieCredits = {
  id: number;
  cast: CastMember[];
  crew: CrewMember[];
};

export type MovieKeywords = {
  id: number;
  keywords: Keyword[];
};

/**
 * Response when chaining details with account_states, credits and keywords via
 * `append_to_response`. Each appended endpoint's response is merged in as a
 * top-level key named after the endpoint (its own `id` is redundant but TMDB
 * still sends it).
 *
 * Example request:
 *   GET /movie/{movie_id}?append_to_response=account_states,credits,keywords&session_id=...
 */
export type MovieDetailsWithExtras = MovieDetails & {
  account_states: AccountStates;
  credits: MovieCredits;
  keywords: MovieKeywords;
};

/* -------------------------------------------------------------------------- */
/*  List responses                                                            */
/* -------------------------------------------------------------------------- */

/** /recommendations and /discover all share this shape. */
export type MovieListResponse = PaginatedResponse<MovieSummary>;

export type RatedMovie = MovieSummary & { rating: number };
export type RatedMoviesResponse = PaginatedResponse<RatedMovie>;

export type TrendingMovie = MovieSummary & { media_type: "movie" };
export type TrendingMoviesResponse = PaginatedResponse<TrendingMovie>;
