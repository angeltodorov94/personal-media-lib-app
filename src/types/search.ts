/**
 * TMDB multi-search types.
 *
 * Endpoint covered:
 *  - GET /search/multi -> SearchMultiResponse
 */

import { PaginatedResponse } from "./common";
import { TrendingMovie } from "./movie";
import { TrendingTVShow } from "./tv";
import { PersonSummary } from "./person";

/** Trimmed movie/TV object listed under a person's `known_for` */
export type KnownForItem = TrendingMovie | TrendingTVShow;

export type SearchPersonResult = PersonSummary & {
  media_type: "person";
  known_for: KnownForItem[];
};

/** Discriminated union on `media_type` */
export type MultiSearchResult =
  | TrendingMovie
  | TrendingTVShow
  | SearchPersonResult;

export type SearchMultiResponse = PaginatedResponse<MultiSearchResult>;
