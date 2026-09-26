export type MediaType = "movies" | "tv";

export type SortType = "asc" | "desc";

export type MutationResponse = {
  status_code: number;
  status_message: string;
};

/**
 * Generic TMDB paginated response wrapper used by
 * /similar, /recommendations, /search, /discover, etc.
 */
export interface PaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

/* -------------------------------------------------------------------------- */
/*  GET /tv/{series_id}/account_states                                        */
/*  GET /movie/{series_id}/account_states                                     */
/* -------------------------------------------------------------------------- */

export interface AccountStates {
  id: number;
  favorite: boolean;
  /** `false` when not rated, otherwise an object holding the user's rating (0.5–10) */
  rated?: { value: number };
  watchlist: boolean;
}
