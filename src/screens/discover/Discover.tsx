import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import FilterSheet from "@/components/filter-sheet/FilterSheet";
import MyRatingListComponent from "@/components/my-rating-list-component/MyRatingListComponent";
import SortSheet from "@/components/sort-sheet/SortSheet";
import { useGetDiscoverMovie } from "@/hooks/api/discover/useGetDiscoverMovie";
import { useFlatListHeaderAnimation } from "@/hooks/useFlatListHeaderAnimation";
import {
  initFilterState,
  setIsFilterPanelOpen,
  useFiltersStore,
} from "@/stores/useFiltersStore";
import {
  initSortingState,
  setIsSortingPanelOpen,
  useSortingStore,
} from "@/stores/useSortingStore";
import { MovieSummary } from "@/types/movie-types";
import { useNavigation, useRouter } from "expo-router";
import { ArrowDownUp, FunnelPlus, FunnelX } from "lucide-react-native";
import { useLayoutEffect } from "react";
import { Animated, RefreshControl } from "react-native";

export default function DiscoverScreen() {
  const { ref, height, onScroll } = useFlatListHeaderAnimation<MovieSummary>();

  const mediaType = useFiltersStore((s) => s.discoverScreenMediaType);
  const filters = useFiltersStore((s) => s.discoverScreenFilters);
  const isFiltersOn =
    JSON.stringify(filters) !== JSON.stringify(initFilterState);
  const sorting = useSortingStore((s) => s.discoverSortPanel);
  const isSortingOn =
    JSON.stringify(sorting) !== JSON.stringify(initSortingState);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    refetch,
    isRefetching,
    error,
  } = useGetDiscoverMovie(mediaType, filters, sorting);
  const movies = data?.pages.flatMap((p) => p.results) ?? [];

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      rightButton: {
        icon: isFiltersOn ? FunnelX : FunnelPlus,
        type: isFiltersOn ? "primary" : "secondary",
        onPress: () => setIsFilterPanelOpen("discover", true),
      },
      leftButton: {
        icon: ArrowDownUp,
        type: isSortingOn ? "primary" : "secondary",
        onPress: () => setIsSortingPanelOpen("discover", true),
      },
    });
  }, [navigation, isFiltersOn, isSortingOn]);

  return (
    <>
      <Animated.FlatList<MovieSummary>
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            progressViewOffset={height} // pushes the spinner below your floating header
          />
        }
        ref={ref}
        data={movies}
        onScroll={onScroll}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        scrollEventThrottle={16}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: height + 10,
          paddingBottom: 10,
          gap: 10,
        }}
        ListEmptyComponent={() => {
          if (isLoading) {
            return <Loading />;
          }

          if (error) {
            return <Error />;
          }

          return <Empty />;
        }}
        renderItem={({ item }) => (
          <MyRatingListComponent
            screen="discover"
            item={item}
            onItemPress={() =>
              router.push({
                pathname: `/${mediaType === "movies" ? "movie" : "tv"}/[id]`,
                params: { id: item.id },
              })
            }
          />
        )}
      />
      <SortSheet type="discover" />
      <FilterSheet type="discover" />
    </>
  );
}
