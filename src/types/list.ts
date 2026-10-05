/**
 * TMDB API v4 list types.
 *
 * Endpoints covered:
 *  - GET /4/list/{list_id} -> ListDetails
 *
 * Reference: https://developer.themoviedb.org/v4/reference/list-details
 */

import { PaginatedResponse } from "./common";
import { TrendingMovie } from "./movie";
import { TrendingTVShow } from "./tv";

/* -------------------------------------------------------------------------- */
/*  Building blocks                                                           */
/* -------------------------------------------------------------------------- */

/** The TMDB account that owns the list. Note: `id` is a string in v4. */
export type ListCreator = {
  id: string;
  name: string;
  username: string;
  avatar_path: string | null;
  gravatar_hash: string;
};

/** A list can mix movies and TV shows, discriminated on `media_type`. */
export type ListItem = TrendingMovie | TrendingTVShow;

/** Keys look like `movie:{id}` or `tv:{id}`. */
export type ListItemKey = `${ListItem["media_type"]}:${number}`;

/* -------------------------------------------------------------------------- */
/*  GET /4/list/{list_id}                                                     */
/* -------------------------------------------------------------------------- */

export type ListDetailsParams = {
  /** ISO 639-1 code, optionally with region (default `en-US`) */
  language?: string;
  /** 1-based page of `results` (default `1`) */
  page?: number;
};

export type ListDetails = PaginatedResponse<ListItem> & {
  id: number;
  name: string;
  description: string;
  public: boolean;
  item_count: number;
  average_rating: number;
  backdrop_path: string | null;
  poster_path: string | null;
  iso_639_1: string;
  iso_3166_1: string;
  /** Combined revenue of the items in the list */
  revenue: number;
  /** Combined runtime of the items in the list, in minutes */
  runtime: number;
  /** e.g. `original_order.asc` */
  sort_by: string;
  created_by: ListCreator;
  /** Per-item comment, `null` when the item has none */
  comments: Record<ListItemKey, string | null>;
  /** Item key -> TMDB's internal object id */
  object_ids: Record<ListItemKey, string>;
};
