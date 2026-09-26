import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import MyRatingFilterSheet from "@/components/my-rating-filter-sheet/MyRatingFilterSheet";
import MyRatingListComponent from "@/components/my-rating-list-component/MyRatingListComponent";
import RatingModal from "@/components/rating-modal/RatingModal";
import { useGetMyRatings } from "@/hooks/api/account/useGetMyRatings";
import { useHeaderHeightStore } from "@/stores/useHeaderHeightStore";
import {
  setIsOpen,
  useMyRatingsFiltersStore,
} from "@/stores/useMyRatingsFiltersStore";
import {
  setSortType,
  useMyRatingsSortingStore,
} from "@/stores/useMyRatingsSortingStore";
import { RatedMovie } from "@/types/movie-types";
import { RatedTVShow } from "@/types/tv-shows-type";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import {
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
  Funnel,
} from "lucide-react-native";
import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Animated, FlatList, RefreshControl } from "react-native";

export default function RatingsScreen() {
  const [ratingToEdit, setRatingToEdit] = useState<
    RatedMovie | RatedTVShow | null
  >(null);
  const navigation = useNavigation();
  const router = useRouter();
  const mediaType = useMyRatingsFiltersStore((s) => s.mediaType);
  const isOpen = useMyRatingsFiltersStore((s) => s.isOpen);
  const sortType = useMyRatingsSortingStore((s) => s.sortType);
  const height = useHeaderHeightStore((s) => s.height);
  const scrollY = useHeaderHeightStore((s) => s.scrollY);
  const { data, error, isLoading, refetch, isRefetching } = useGetMyRatings(
    mediaType,
    sortType,
  );
  const ref =
    useRef<FlatList<NonNullable<typeof data>["results"][number]>>(null);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollY.setValue(0);
        ref.current?.scrollToOffset({ offset: 0, animated: false });
      };
    }, [scrollY]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      rightButton: { icon: Funnel, onPress: () => setIsOpen(true) },
      leftButton: {
        icon: sortType === "asc" ? ArrowUpNarrowWide : ArrowDownWideNarrow,
        onPress: () => setSortType(sortType === "asc" ? "desc" : "asc"),
      },
      label:
        data &&
        `Total ${mediaType === "movies" ? "Movies" : "TV Shows"}: ${data?.total_results}`,
    });
  }, [navigation, data?.total_results, sortType, mediaType]);

  return (
    <>
      <Animated.FlatList<NonNullable<typeof data>["results"][number]>
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={refetch}
            progressViewOffset={height} // pushes the spinner below your floating header
          />
        }
        ref={ref}
        data={data?.results}
        onScroll={onScroll}
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
            item={item}
            onRatingPress={() => setRatingToEdit(item)}
            onItemPress={() =>
              router.push({
                pathname: `/ratings/${mediaType === "movies" ? "movie" : "tv"}/[id]`,
                params: { id: item.id },
              })
            }
          />
        )}
      />
      <RatingModal item={ratingToEdit} onClose={() => setRatingToEdit(null)} />
      <MyRatingFilterSheet open={isOpen} onOpenChange={setIsOpen} />
    </>
  );
}
