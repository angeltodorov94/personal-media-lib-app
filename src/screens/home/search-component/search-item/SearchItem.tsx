import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { TradingMovie } from "@/types/movie-types";
import { TMDBSearchPersonResult } from "@/types/person-types";
import { TMDBMultiSearchResult } from "@/types/search-types";
import { TradingTVShow } from "@/types/tv-shows-type";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

type Props = {
  item: TMDBMultiSearchResult;
  onClick: () => void;
};

const SearchItem = ({ item, onClick }: Props) => {
  const [data, setData] = useState<{
    url: string;
    text: string;
    type: "movie" | "tv" | "person" | "";
    year: string;
    pathname: "/home/movie/[id]" | "/home/tv/[id]" | "/home/person/[id]";
  }>({
    url: "",
    text: "",
    type: "",
    year: "",
    pathname: "/home/movie/[id]",
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
          pathname: "/home/person/[id]",
        });
        break;
      case "movie":
        const movie = item as TradingMovie;
        setData({
          url: movie.poster_path || "",
          text: movie.title,
          type: "movie",
          year: new Date(movie.release_date).getFullYear().toString(),
          pathname: "/home/movie/[id]",
        });
        break;
      default:
        const tv = item as TradingTVShow;
        setData({
          url: tv.poster_path || "",
          text: tv.name,
          type: "tv",
          year: new Date(tv.first_air_date).getFullYear().toString(),
          pathname: "/home/tv/[id]",
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
          pathname: data.pathname,
          params: { id: item.id },
        });
        onClick();
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
        showErrorFallback
        errorFallbackText={data.text.toUpperCase()}
      />
      <View>
        <Text style={{ fontSize: 16, fontWeight: 600 }}>{data.text}</Text>
        {data.type !== "person" && (
          <Text variant="caption" style={{ fontSize: 14 }}>
            {data.year}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default SearchItem;
