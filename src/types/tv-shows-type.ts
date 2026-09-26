/**
 * TypeScript types for The Movie Database (TMDB) API v3 — TV Series
 * Endpoints covered:
 *  - GET /tv/{series_id}                    -> TVSeriesDetails
 *  - GET /tv/{series_id}/account_states      -> TVAccountStates
 *  - GET /tv/{series_id}/aggregate_credits   -> TVAggregateCredits
 *  - GET /tv/{series_id}/episode_groups      -> TVEpisodeGroupsResponse
 *  - GET /tv/{series_id}/keywords            -> TVKeywords
 *  - GET /tv/{series_id}/similar             -> TVSimilarResponse
 *  - GET /tv/{series_id}/recommendations     -> TVRecommendationsResponse
 *
 * Reference: https://developer.themoviedb.org/reference/tv-series-details
 *
 * Shared building blocks (Genre, ProductionCompany, ProductionCountry,
 * SpokenLanguage, PaginatedResponse) are reused from the movie types file.
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
import { AggregateCastMember, AggregateCrewMember } from "./person-types";

/* -------------------------------------------------------------------------- */
/*  Shared / building-block types                                             */
/* -------------------------------------------------------------------------- */

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  /** 0 = not specified, 1 = female, 2 = male, 3 = non-binary */
  gender: number;
  profile_path: string | null;
}

export interface Network {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

/** Last/next episode to air, embedded in TV series details */
export interface EpisodeToAir {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string | null;
  episode_number: number;
  episode_type: "standard" | "finale" | "premiere" | "mid_season";
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
}

/** Condensed season summary embedded in TV series details */
export interface SeasonSummary {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}

/**
 * Condensed TV shape returned in list-style endpoints
 * (similar, recommendations, search, discover, etc).
 */
export interface TVSummary {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  first_air_date: string;
  name: string;
  vote_average: number;
  vote_count: number;
}

/* -------------------------------------------------------------------------- */
/*  GET /tv/{series_id}                                                       */
/* -------------------------------------------------------------------------- */

export interface TVSeriesDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: CreatedBy[];
  /** deprecated by TMDB in favor of per-episode runtime, but still returned */
  episode_run_time: number[];
  first_air_date: string;
  genres: Genre[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: EpisodeToAir | null;
  name: string;
  next_episode_to_air: EpisodeToAir | null;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompany[];
  production_countries: ProductionCountry[];
  seasons: SeasonSummary[];
  spoken_languages: SpokenLanguage[];
  status:
    | "Returning Series"
    | "Planned"
    | "In Production"
    | "Ended"
    | "Canceled"
    | "Pilot";
  tagline: string;
  type:
    | "Scripted"
    | "Reality"
    | "Documentary"
    | "News"
    | "Talk Show"
    | "Miniseries"
    | "Video";
  vote_average: number;
  vote_count: number;
}

/* -------------------------------------------------------------------------- */
/*  GET /tv/{series_id}/aggregate_credits                                     */
/* -------------------------------------------------------------------------- */

export interface TVAggregateCredits {
  id: number;
  cast: AggregateCastMember[];
  crew: AggregateCrewMember[];
}

/* -------------------------------------------------------------------------- */
/*  GET /tv/{series_id}/external_ids                                     */
/* -------------------------------------------------------------------------- */

export interface TMDbTVSeriesExternalIds {
  id: number;
  imdb_id: string | null;
  freebase_mid: string | null;
  freebase_id: string | null;
  tvdb_id: number | null;
  tvrage_id: number | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

/* -------------------------------------------------------------------------- */
/*  GET /tv/{series_id}/keywords                                              */
/* -------------------------------------------------------------------------- */

/** Note: unlike the movie endpoint, TV keywords are returned under `results`, not `keywords`. */
export interface TVKeywords {
  id: number;
  results: Keyword[];
}

/* -------------------------------------------------------------------------- */
/*  GET /tv/{series_id}/similar                                               */
/*  GET /tv/{series_id}/recommendations                                       */
/* -------------------------------------------------------------------------- */

export type TVSimilarResponse = PaginatedResponse<TVSummary>;
export type TVRecommendationsResponse = PaginatedResponse<TVSummary>;

/* -------------------------------------------------------------------------- */
/*  GET /account/{account_id}/rated/tv                                    */
/* -------------------------------------------------------------------------- */

export type RatedTVShow = TVSummary & { rating: number };
export type RatedTVShowsResponse = PaginatedResponse<RatedTVShow>;

/* -------------------------------------------------------------------------- */
/*  GET /trending/movie/{time_window}                                         */
/* -------------------------------------------------------------------------- */

export type TradingTVShow = TVSummary & { media_type: string };
export type TradingTVShowsResponse = PaginatedResponse<TradingTVShow>;

/**
 * Shape of the response when chaining details with account_states,
 * aggregate_credits, episode_groups and keywords via `append_to_response`.
 * Each appended endpoint's response is merged in as a top-level key, named
 * after the endpoint itself (its own `id` field is redundant but TMDB still
 * sends it).
 *
 * Example request:
 *   GET /tv/{series_id}?append_to_response=account_states,aggregate_credits,episode_groups,keywords
 */
export type TVSeriesDetailsWithExtras = TVSeriesDetails & {
  account_states: AccountStates;
  aggregate_credits: TVAggregateCredits;
  external_ids: TMDbTVSeriesExternalIds;
  keywords: TVKeywords;
};
