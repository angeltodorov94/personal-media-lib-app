/**
 * TMDB API v3 TV series types.
 *
 * Endpoints covered:
 *  - GET /tv/{series_id}                    -> TVSeriesDetails
 *  - GET /tv/{series_id}/aggregate_credits  -> TVAggregateCredits
 *  - GET /tv/{series_id}/external_ids       -> TVSeriesExternalIds
 *  - GET /tv/{series_id}/keywords           -> TVKeywords
 *  - GET /tv/{series_id}/similar            -> TVListResponse
 *  - GET /tv/{series_id}/recommendations    -> TVListResponse
 *  - GET /discover/tv                       -> TVListResponse
 *  - GET /account/{account_id}/rated/tv     -> RatedTVShowsResponse
 *  - GET /trending/tv/{time_window}         -> TrendingTVShowsResponse
 *
 * Reference: https://developer.themoviedb.org/reference/tv-series-details
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
import {
  AggregateCastMember,
  AggregateCrewMember,
  Gender,
} from "./person";

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                           */
/* -------------------------------------------------------------------------- */

export type CreatedBy = {
  id: number;
  credit_id: string;
  name: string;
  original_name: string;
  gender: Gender;
  profile_path: string | null;
};

export type Network = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

/** Last/next episode to air, embedded in TV series details */
export type EpisodeToAir = {
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
};

/** Condensed season summary embedded in TV series details */
export type SeasonSummary = {
  air_date: string | null;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
};

/** Condensed TV shape returned in list-style endpoints. */
export type TVSummary = MediaSummaryBase & {
  first_air_date: string;
  name: string;
  origin_country: string[];
  original_name: string;
};

/* -------------------------------------------------------------------------- */
/*  GET /tv/{series_id}                                                       */
/* -------------------------------------------------------------------------- */

export type TVSeriesDetails = {
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
};

/* -------------------------------------------------------------------------- */
/*  Appended sub-resources                                                    */
/* -------------------------------------------------------------------------- */

export type TVAggregateCredits = {
  id: number;
  cast: AggregateCastMember[];
  crew: AggregateCrewMember[];
};

export type TVSeriesExternalIds = {
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
};

/** Note: unlike the movie endpoint, TV keywords are returned under `results`, not `keywords`. */
export type TVKeywords = {
  id: number;
  results: Keyword[];
};

/**
 * Response when chaining details with account_states, aggregate_credits,
 * external_ids and keywords via `append_to_response`. Each appended
 * endpoint's response is merged in as a top-level key named after the
 * endpoint (its own `id` is redundant but TMDB still sends it).
 *
 * Example request:
 *   GET /tv/{series_id}?append_to_response=account_states,aggregate_credits,external_ids,keywords
 */
export type TVSeriesDetailsWithExtras = TVSeriesDetails & {
  account_states: AccountStates;
  aggregate_credits: TVAggregateCredits;
  external_ids: TVSeriesExternalIds;
  keywords: TVKeywords;
};

/* -------------------------------------------------------------------------- */
/*  List responses                                                            */
/* -------------------------------------------------------------------------- */

/** /similar, /recommendations and /discover all share this shape. */
export type TVListResponse = PaginatedResponse<TVSummary>;

export type RatedTVShow = TVSummary & { rating: number };
export type RatedTVShowsResponse = PaginatedResponse<RatedTVShow>;

export type TrendingTVShow = TVSummary & { media_type: "tv" };
export type TrendingTVShowsResponse = PaginatedResponse<TrendingTVShow>;
