import Loading from "@/components/common/loading/Loading";
import VerticalMovieCard from "@/components/details-screen-components/vertical-movie-card/VerticalMovieCard";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Image } from "@/components/ui/image";
import { SearchBar } from "@/components/ui/searchbar";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetMultiSearch } from "@/hooks/api/search/useGetMultiSearch";
import { useGetTrendingMovies } from "@/hooks/api/trending/useGetTrendingMovies";
import { useGetTrendingShows } from "@/hooks/api/trending/useGetTrendingShows";
import { useColor } from "@/hooks/useColor";
import { useHeaderHeightStore } from "@/stores/useHeaderHeightStore";
import { TradingMovie } from "@/types/movie-types";
import { TMDBSearchPersonResult } from "@/types/person-types";
import { TMDBMultiSearchResult } from "@/types/search-types";
import { TradingTVShow } from "@/types/tv-shows-type";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { Funnel, Search } from "lucide-react-native";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import {
  Animated,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function DiscoverScreen() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [submittedSearch, setSubmittedSearch] = useState("");
  const moviesQ = useGetTrendingMovies();
  const showsQ = useGetTrendingShows();
  const inputBorderColor = useColor("textMuted");
  const navigation = useNavigation();
  const router = useRouter();
  const height = useHeaderHeightStore((s) => s.height);
  const scrollY = useHeaderHeightStore((s) => s.scrollY);
  const ref = useRef<ScrollView>(null);

  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isSearchLoading,
  } = useGetMultiSearch(submittedSearch);

  const searchResults = searchData?.pages.flatMap((p) => p.results) ?? [];

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollY.setValue(0);
        ref.current?.scrollTo({ y: 0, animated: false });
      };
    }, [scrollY]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      leftButton: {
        icon: Search,
        onPress: () => setIsSearchVisible(true),
      },
      rightButton: {
        icon: Funnel,
        onPress: () => setIsSearchVisible(true),
      },
    });
  }, [navigation]);

  // inside component:
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 100;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleSheetScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(e.nativeEvent) && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (moviesQ.isLoading || showsQ.isLoading) {
    return <Loading />;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Animated.ScrollView
        ref={ref}
        scrollEventThrottle={16}
        contentContainerStyle={{
          flexGrow: 1,
          paddingTop: height + 5,
          paddingBottom: 10,
          gap: 20,
        }}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        onScroll={onScroll}
      >
        {moviesQ.data && (
          <View>
            <Text variant="heading" style={s.heading}>
              Popular Movies
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 10,
              }}
            >
              {moviesQ.data.results.map((item) => (
                <VerticalMovieCard
                  key={item.id}
                  item={item}
                  onPress={() =>
                    router.push({
                      pathname: "/discover/movie/[id]",
                      params: { id: item.id },
                    })
                  }
                />
              ))}
            </ScrollView>
          </View>
        )}
        {showsQ.data && (
          <View>
            <Text variant="heading" style={s.heading}>
              Popular TV Shows
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled
              contentContainerStyle={{
                gap: 10,
                paddingHorizontal: 10,
              }}
            >
              {showsQ.data.results.map((item) => (
                <VerticalMovieCard
                  key={item.id}
                  item={item}
                  onPress={() =>
                    router.push({
                      pathname: "/discover/tv/[id]",
                      params: { id: item.id },
                    })
                  }
                />
              ))}
            </ScrollView>
          </View>
        )}
      </Animated.ScrollView>
      <BottomSheet
        isVisible={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
        snapPoints={[0.6, 0.9]}
        enableBackdropDismiss
        onScroll={handleSheetScroll}
      >
        <SearchBar
          loading={isSearchLoading}
          onSearch={(query) => setSubmittedSearch(query)}
          onClear={() => setSubmittedSearch("")}
          debounceMs={300}
          placeholder="Search for anything..."
          containerStyle={{
            borderWidth: 1,
            borderColor: inputBorderColor,
            marginBottom: 10,
          }}
        />
        <View>
          {searchResults.map((item) => (
            <SearchItem key={`${item.media_type}-${item.id}`} item={item} />
          ))}
          {isFetchingNextPage && <Loading />}
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const s = StyleSheet.create({
  heading: { paddingBottom: 10, paddingHorizontal: 10 },
});

type Props = {
  item: TMDBMultiSearchResult;
};

const SearchItem = ({ item }: Props) => {
  const [data, setData] = useState<{
    url: string;
    text: string;
    type: "movie" | "tv" | "person" | "";
    year: string;
    pathname:
      | "/discover/movie/[id]"
      | "/discover/tv/[id]"
      | "/discover/person/[id]";
  }>({
    url: "",
    text: "",
    type: "",
    year: "",
    pathname: "/discover/movie/[id]",
  });
  const router = useRouter();

  useEffect(() => {
    switch (item.media_type) {
      case "person":
        const person = item as TMDBSearchPersonResult;
        setData({
          url: person.profile_path || "",
          text: person.name,
          type: "person",
          year: "",
          pathname: "/discover/person/[id]",
        });
        break;
      case "movie":
        const movie = item as TradingMovie;
        setData({
          url: movie.poster_path || "",
          text: movie.title,
          type: "movie",
          year: new Date(movie.release_date).getFullYear().toString(),
          pathname: "/discover/movie/[id]",
        });
        break;
      default:
        const tv = item as TradingTVShow;
        setData({
          url: tv.poster_path || "",
          text: tv.name,
          type: "tv",
          year: new Date(tv.first_air_date).getFullYear().toString(),
          pathname: "/discover/tv/[id]",
        });
        break;
    }
  }, []);

  return (
    <TouchableOpacity
      style={{
        paddingVertical: 8,
        paddingHorizontal: 4,
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
      onPress={() => {
        router.navigate({
          pathname: "/discover/movie/[id]",
          params: { id: item.id },
        });
      }}
    >
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w92${data.url}`,
        }}
        alt={data.text}
        width={32}
        aspectRatio={data.type === "person" ? 1 / 1 : 2 / 3}
        variant={data.type === "person" ? "circle" : "default"}
        containerStyle={{ borderRadius: data.type === "person" ? 100 : 4 }}
      />
      <View>
        <Text style={{ fontSize: 16 }}>{data.text}</Text>
        {data.type !== "person" && (
          <Text variant="caption" style={{ fontSize: 14 }}>
            {data.year}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};
