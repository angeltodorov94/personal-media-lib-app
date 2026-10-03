import { AccountStates } from "@/types/common";
import { MovieDetailsWithExtras } from "@/types/movie";
import { TVSeriesDetailsWithExtras } from "@/types/tv";
import { QueryClient } from "@tanstack/react-query";

type DetailsWithAccountStates =
  | MovieDetailsWithExtras
  | TVSeriesDetailsWithExtras;

// TMDB's read side lags a write by roughly 500ms-1s (not every time), so a
// refetch right after a rating change can return the previous rating.
const TMDB_READ_LAG_MS = 1000;

// Writes the rating a mutation just saved straight into the details cache.
// The details key is deliberately not invalidated afterwards: that refetch
// could hit the lag and overwrite this with the old rating.
export async function setCachedRating(
  qC: QueryClient,
  type: "movie" | "tv",
  id: number,
  rated: AccountStates["rated"],
) {
  const queryKey = [
    type === "movie" ? "movie-details" : "tv-show-details",
    String(id),
  ];

  // An in-flight fetch that started before the write would overwrite it
  await qC.cancelQueries({ queryKey });

  qC.setQueryData<DetailsWithAccountStates>(
    queryKey,
    (old) =>
      old && {
        ...old,
        account_states: { ...old.account_states, rated },
      },
  );
}

// The ratings list can't be patched by hand (membership, sort order and
// pagination all change), so refetch it once TMDB has caught up.
export function invalidateMyRatingsLater(
  qC: QueryClient,
  type: "movie" | "tv",
) {
  setTimeout(() => {
    qC.invalidateQueries({
      queryKey: ["my-ratings", type === "movie" ? "movies" : "tv"],
    });
  }, TMDB_READ_LAG_MS);
}
