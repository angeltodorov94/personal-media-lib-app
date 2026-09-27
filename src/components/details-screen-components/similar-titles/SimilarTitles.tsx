import Loading from "@/components/common/loading/Loading";
import { Collapsible } from "@/components/ui/collapsible";
import { useGetMovieSimilar } from "@/hooks/api/movie/useGetMovieSimilar";
import { useGetTvShowSimilar } from "@/hooks/api/tv-show/useGetTvShowSimilar";
import { usePathname, useRouter } from "expo-router";
import { useState } from "react";
import { ScrollView } from "react-native";
import VerticalMovieCard from "../vertical-movie-card/VerticalMovieCard";

type Props = {
  id: string;
  type: "movie" | "tv";
};

const SimilarTitles = ({ id, type }: Props) => {
  const basePath = usePathname().split("/")[1] as "ratings" | "discover";
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const movies = useGetMovieSimilar(id, isOpen && type === "movie");
  const series = useGetTvShowSimilar(id, isOpen && type === "tv");

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
        {data?.results.map((item) => {
          const releaseDate =
            "first_air_date" in item ? item.first_air_date : item.release_date;

          if (!releaseDate) return null;

          return (
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
          );
        })}
      </ScrollView>
    );
  };

  return (
    <Collapsible title="Similar" isOpen={isOpen} setIsOpen={setIsOpen}>
      {renderData()}
    </Collapsible>
  );
};

export default SimilarTitles;
