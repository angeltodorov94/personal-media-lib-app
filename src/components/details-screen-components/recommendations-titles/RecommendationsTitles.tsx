import Loading from "@/components/common/loading/Loading";
import { Collapsible } from "@/components/ui/collapsible";
import { useGetMovieRecommendations } from "@/hooks/api/movie/useGetMovieRecommendations";
import { useGetTvShowRecommendations } from "@/hooks/api/tv-show/useGetTvShowRecommendations";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import VerticalMovieCard from "../vertical-movie-card/VerticalMovieCard";

type Props = {
  id: string;
  type: "movie" | "tv";
};

const RecommendationsTitles = ({ id, type }: Props) => {
  const basePath = usePathname().split("/")[1] as "ratings" | "discover";
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const movies = useGetMovieRecommendations(id, isOpen && type === "movie");
  const series = useGetTvShowRecommendations(id, isOpen && type === "tv");

  const renderData = () => {
    if (series.isLoading || movies.isLoading) {
      return <Loading flex={0} />;
    }

    const data = movies.data || series.data;

    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{
          gap: 10,
          paddingLeft: 34,
          paddingRight: 10,
          marginTop: 5,
        }}
      >
        {data?.results.map((item) => (
          <VerticalMovieCard
            key={item.id}
            item={item}
            onPress={() =>
              router.navigate({
                pathname: `/${basePath}/${type}/[id]`,
                params: { id: item.id },
              })
            }
          />
        ))}
      </ScrollView>
    );
  };

  return (
    <Collapsible title="Recommendations" isOpen={isOpen} setIsOpen={setIsOpen}>
      {renderData()}
    </Collapsible>
  );
};

export default RecommendationsTitles;

const s = StyleSheet.create({});
