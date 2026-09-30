import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import FilterSheet from "@/components/filter-sheet/FilterSheet";
import MyRatingListComponent from "@/components/my-rating-list-component/MyRatingListComponent";
import RatingModal from "@/components/rating-modal/RatingModal";
import SortSheet from "@/components/sort-sheet/SortSheet";
import { useGetMyRatings } from "@/hooks/api/account/useGetMyRatings";
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
import { RatedMedia } from "@/types/rating";
import { useNavigation, useRouter } from "expo-router";
import { ArrowDownUp, FunnelPlus, FunnelX } from "lucide-react-native";
import { useLayoutEffect, useState } from "react";
import { Animated, RefreshControl } from "react-native";

export default function RatingsScreen() {
  const [ratingToEdit, setRatingToEdit] = useState<RatedMedia | null>(null);
  const { ref, height, onScroll } = useFlatListHeaderAnimation<RatedMedia>();
  const mediaType = useFiltersStore((s) => s.ratingsScreenMediaType);
  const filters = useFiltersStore((s) => s.ratingsScreenFilters);
  const isFiltersOn =
    JSON.stringify(filters) !== JSON.stringify(initFilterState);
  const sorting = useSortingStore((s) => s.ratingsSortPanel);
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
  } = useGetMyRatings(mediaType, sorting.orderBy);
  const movies = data?.pages.flatMap((p) => p.results) ?? [];

  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      rightButton: {
        icon: isFiltersOn ? FunnelX : FunnelPlus,
        type: isFiltersOn ? "primary" : "secondary",
        onPress: () => setIsFilterPanelOpen("ratings", true),
      },
      leftButton: {
        icon: ArrowDownUp,
        type: isSortingOn ? "primary" : "secondary",
        onPress: () => setIsSortingPanelOpen("ratings", true),
      },
    });
  }, [navigation, isFiltersOn, isSortingOn]);

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     label:
  //       data &&
  //       `Total ${mediaType === "movies" ? "Movies" : "TV Shows"}: ${ratings.data?.total_results}`,
  //   });
  // }, [navigation, ratings.data?.total_results, mediaType]);

  return (
    <>
      <Animated.FlatList<RatedMedia>
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            progressViewOffset={height} // pushes the spinner below your floating header
          />
        }
        ref={ref}
        data={movies}
        extraData={movies}
        onScroll={onScroll}
        scrollEventThrottle={16}
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
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
            screen="ratings"
            item={item}
            onRatingPress={() => setRatingToEdit(item)}
            onItemPress={() =>
              router.push({
                pathname: `/${mediaType === "movies" ? "movie" : "tv"}/[id]`,
                params: { id: item.id },
              })
            }
          />
        )}
      />
      <RatingModal
        item={ratingToEdit}
        isVisible={!!ratingToEdit}
        onClose={() => setRatingToEdit(null)}
      />
      <SortSheet type="ratings" />
      <FilterSheet type="ratings" />
    </>
  );
}
