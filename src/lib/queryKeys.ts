// Ids arrive as strings from route params but as numbers from API data.
// TanStack Query treats 123 and "123" as different keys, so always stringify.
export const queryKeys = {
  myRatings: ["my-ratings"] as const,
  movieDetails: (id: string | number) =>
    ["movie-details", String(id)] as const,
  tvShowDetails: (id: string | number) =>
    ["tv-show-details", String(id)] as const,
  details: (type: "movie" | "tv", id: string | number) =>
    type === "tv" ? queryKeys.tvShowDetails(id) : queryKeys.movieDetails(id),
};
