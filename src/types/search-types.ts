import { TradingMovie } from "./movie-types";
import { TMDBSearchPersonResult } from "./person-types";
import { TradingTVShow } from "./tv-shows-type";

// ---- Top-level response ----
export interface TMDBSearchMultiResponse {
  page: number;
  results: TMDBMultiSearchResult[];
  total_pages: number;
  total_results: number;
}

// Discriminated union based on media_type
export type TMDBMultiSearchResult =
  | TradingMovie
  | TradingTVShow
  | TMDBSearchPersonResult;
