import CollectionListItem from "@/components/collection-list-item/CollectionListItem";
import Empty from "@/components/common/empty/Empty";
import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import { useGetListDetails } from "@/hooks/api/list/useGetListDetails";
import { useFlatListHeaderAnimation } from "@/hooks/useFlatListHeaderAnimation";
import { ListItem, ListItemKey } from "@/types/list";
import { useNavigation } from "expo-router";
import { Plus } from "lucide-react-native";
import { useLayoutEffect } from "react";
import { Animated, RefreshControl } from "react-native";

const MyCollectionScreen = () => {
  const navigation = useNavigation();
  const { ref, height, onScroll } = useFlatListHeaderAnimation<ListItem>();

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useGetListDetails();

  useLayoutEffect(() => {
    navigation.setOptions({
      rightButton: {
        icon: Plus,
        onPress: () => {},
      },
    });
  }, [navigation]);

  const items = data?.pages.flatMap((p) => p.results) ?? [];
  // TMDB stores a note as one string; split it into its lines per item
  const comments = (data?.pages ?? []).reduce<
    Partial<Record<ListItemKey, string[]>>
  >((acc, p) => {
    (Object.keys(p.comments) as ListItemKey[]).forEach((key) => {
      acc[key] = p.comments[key]?.split("\n") ?? [];
    });

    return acc;
  }, {});

  // Rendered inside the list so it sits below the transparent header
  const emptyState = isLoading ? <Loading /> : isError ? <Error /> : <Empty />;

  return (
    <Animated.FlatList<ListItem>
      ref={ref}
      refreshControl={
        <RefreshControl
          refreshing={isRefetching}
          onRefresh={refetch}
          progressViewOffset={height} // pushes the spinner below the floating header
        />
      }
      data={items}
      onScroll={onScroll}
      scrollEventThrottle={16}
      onEndReached={() => {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }}
      onEndReachedThreshold={0.5}
      // A list mixes movies and TV shows, whose ids can collide
      keyExtractor={(item) => `${item.media_type}-${item.id}`}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: height + 10,
        paddingBottom: 10,
        gap: 10,
      }}
      ListEmptyComponent={emptyState}
      renderItem={({ item }) => {
        const key: ListItemKey = `${item.media_type}:${item.id}`;

        return <CollectionListItem item={item} commentLines={comments[key]} />;
      }}
    />
  );
};

export default MyCollectionScreen;
