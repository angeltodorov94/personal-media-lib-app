/**
 * Shared TMDB API v3 building blocks and app-level primitives.
 * This file has no dependencies on the other type files.
 */

/* -------------------------------------------------------------------------- */
/*  App-level primitives                                                      */
/* -------------------------------------------------------------------------- */

export type MediaType = "movies" | "tv";

export type SortType = "asc" | "desc";

export type MutationResponse = {
  status_code: number;
  status_message: string;
};

/* -------------------------------------------------------------------------- */
/*  Generic response wrappers                                                 */
/* -------------------------------------------------------------------------- */

/** Paginated wrapper used by /recommendations, /search, /discover, etc. */
export type PaginatedResponse<T> = {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
};

/* -------------------------------------------------------------------------- */
/*  Shared entities                                                           */
/* -------------------------------------------------------------------------- */

export type Genre = {
  id: number;
  name: string;
};

export type GenreListResponse = {
  genres: Genre[];
};

export type Keyword = {
  id: number;
  name: string;
};

export type ProductionCompany = {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
};

export type ProductionCountry = {
  iso_3166_1: string;
  name: string;
};

export type SpokenLanguage = {
  english_name: string;
  iso_639_1: string;
  name: string;
};

export type Country = {
  iso_3166_1: string;
  english_name: string;
  native_name: string;
};

/**
 * Fields shared by the condensed movie and TV shapes returned in
 * list-style endpoints (recommendations, search, discover, etc).
 */
export type MediaSummaryBase = {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
};

/** GET /movie/{id}/account_states and GET /tv/{id}/account_states */
export type AccountStates = {
  id: number;
  favorite: boolean;
  /** `false` when not rated, otherwise an object holding the user's rating (0.5–10) */
  rated: false | { value: number };
  watchlist: boolean;
};
