import { TradingMovie } from "./movie-types";
import { TmdbGender, TmdbKnownForDepartment } from "./person-full-details";
import { TradingTVShow } from "./tv-shows-type";

export type TMDBPersonSummary = {
  adult: boolean;
  gender: TmdbGender;
  id: number;
  known_for_department: TmdbKnownForDepartment;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
};

export type AggregateCastRole = {
  credit_id: string;
  character: string;
  episode_count: number;
};

export type AggregateCastMember = TMDBPersonSummary & {
  roles: AggregateCastRole[];
  total_episode_count: number;
  order: number;
};

export type AggregateCrewJob = {
  credit_id: string;
  job: string;
  episode_count: number;
};

export type AggregateCrewMember = TMDBPersonSummary & {
  department: string;
  jobs: AggregateCrewJob[];
  total_episode_count: number;
};

export type TMDBSearchPersonResult = TMDBPersonSummary & {
  media_type: "person";
  known_for: TMDBKnownForItem[];
};

// "known_for" items are trimmed movie/TV objects (no media_type consistency
// guarantees on some edge cases, so keep it a union of the two above minus person)
export type TMDBKnownForItem =
  | (Omit<TradingMovie, "media_type"> & { media_type: "movie" })
  | (Omit<TradingTVShow, "media_type"> & { media_type: "tv" });

export type CastMember = TMDBPersonSummary & {
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

export type CrewMember = TMDBPersonSummary & {
  credit_id: string;
  department: string;
  job: string;
};
