/**
 * TMDB API v3 collection types.
 *
 * Endpoints covered:
 *  - GET /collection/{collection_id} -> CollectionDetails
 *
 * Reference: https://developer.themoviedb.org/reference/collection-details
 */

import { MovieSummary } from "./movie";

/** A movie inside a collection. TMDB adds `media_type` to each part. */
export type CollectionPart = MovieSummary & { media_type: "movie" };

export type CollectionDetails = {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  parts: CollectionPart[];
};
