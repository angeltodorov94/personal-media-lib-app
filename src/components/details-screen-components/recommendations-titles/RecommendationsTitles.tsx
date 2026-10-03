import Loading from "@/components/common/loading/Loading";
import HorizontalScroll from "@/components/layouts/horizontal-scroll/HorizontalScroll";
import { Collapsible } from "@/components/ui/collapsible";
import { useGetMovieRecommendations } from "@/hooks/api/movie/useGetMovieRecommendations";
import { useGetTvShowRecommendations } from "@/hooks/api/tv-show/useGetTvShowRecommendations";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import VerticalMediaCard from "../vertical-media-card/VerticalMediaCard";

type Props = {
  id: string;
  type: "movie" | "tv";
};

const RecommendationsTitles = ({ id, type }: Props) => {
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
      <HorizontalScroll style={{ paddingLeft: 35 }}>
        {data?.results.map((item) => (
          <VerticalMediaCard
            key={item.id}
            item={item}
            onPress={() =>
              router.navigate({
                pathname: `/${type}/[id]`,
                params: { id: item.id },
              })
            }
          />
        ))}
      </HorizontalScroll>
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
