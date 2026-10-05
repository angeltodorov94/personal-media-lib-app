import { applyDiscoverFilter } from "@/stores/useFiltersStore";
import { Genre, Keyword } from "@/types/common";
import { useRouter } from "expo-router";

/** Sets the Discover filter from a details screen and jumps to the Discover tab. */
export function useDiscoverFilterNavigation(type: "movie" | "tv") {
  const router = useRouter();
  const media = type === "movie" ? "movies" : "tv";

  const filterByGenre = (genre: Genre) => {
    applyDiscoverFilter(media, {
      genres: [{ value: genre.id.toString(), label: genre.name }],
    });
    router.navigate("/(tabs)/(discover)");
  };

  const filterByKeyword = (keyword: Keyword) => {
    applyDiscoverFilter(media, {
      keyword: { value: keyword.id.toString(), label: keyword.name },
    });
    router.navigate("/(tabs)/(discover)");
  };

  return { filterByGenre, filterByKeyword };
}
