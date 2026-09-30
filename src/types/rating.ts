/**
 * Account ratings span both movies and TV shows.
 *
 * Endpoints covered:
 *  - GET /account/{account_id}/rated/movies
 *  - GET /account/{account_id}/rated/tv
 */

import { PaginatedResponse } from "./common";
import { RatedMovie } from "./movie";
import { RatedTVShow } from "./tv";

/** A rated title of either kind, e.g. one row of the ratings list */
export type RatedMedia = RatedMovie | RatedTVShow;

export type RatedMediaResponse = PaginatedResponse<RatedMedia>;
