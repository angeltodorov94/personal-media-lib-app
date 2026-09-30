import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import VerticalMediaCard from "@/components/details-screen-components/vertical-media-card/VerticalMediaCard";
import HorizontalScroll from "@/components/layouts/horizontal-scroll/HorizontalScroll";
import ScrollViewPageLayout from "@/components/layouts/scrollview-page-layout/ScrollViewPageLayout";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetTrendingMovies } from "@/hooks/api/trending/useGetTrendingMovies";
import { useGetTrendingShows } from "@/hooks/api/trending/useGetTrendingShows";
import { useNavigation, useRouter } from "expo-router";
import { Search, Settings } from "lucide-react-native";
import { useLayoutEffect, useState } from "react";
import SearchComponent from "./search-component/SearchComponent";

export default function HomeScreen() {
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const moviesQ = useGetTrendingMovies();
  const showsQ = useGetTrendingShows();
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      rightButton: {
        icon: Search,
        onPress: () => setIsSearchVisible(true),
      },
      leftButton: {
        icon: Settings,
        onPress: () => {},
      },
    });
  }, [navigation]);

  if (moviesQ.isLoading || showsQ.isLoading) {
    return <Loading />;
  }

  if (moviesQ.isError || showsQ.isError) {
    return <Error />;
  }

  return (
    <ScrollViewPageLayout style={{ marginTop: 10 }}>
      {moviesQ.data && (
        <View>
          <Text variant="heading" style={{ marginLeft: 10 }}>
            Popular Movies
          </Text>
          <HorizontalScroll>
            {moviesQ.data.results.map((item) => (
              <VerticalMediaCard
                key={item.id}
                item={item}
                onPress={() =>
                  router.push({
                    pathname: "/movie/[id]",
                    params: { id: item.id },
                  })
                }
              />
            ))}
          </HorizontalScroll>
        </View>
      )}
      {showsQ.data && (
        <View>
          <Text variant="heading" style={{ marginLeft: 10 }}>
            Popular TV Shows
          </Text>
          <HorizontalScroll>
            {showsQ.data.results.map((item) => (
              <VerticalMediaCard
                key={item.id}
                item={item}
                onPress={() =>
                  router.push({
                    pathname: "/tv/[id]",
                    params: { id: item.id },
                  })
                }
              />
            ))}
          </HorizontalScroll>
        </View>
      )}
      <SearchComponent
        isVisible={isSearchVisible}
        onClose={() => setIsSearchVisible(false)}
      />
    </ScrollViewPageLayout>
  );
}
