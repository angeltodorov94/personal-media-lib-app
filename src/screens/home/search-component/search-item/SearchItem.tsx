import RipplePressable from "@/components/ripple-pressable/RipplePressable";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { MultiSearchResult } from "@/types/search";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";

type Props = {
  item: MultiSearchResult;
  onClick: () => void;
};

const SearchItem = ({ item, onClick }: Props) => {
  const [data, setData] = useState<{
    url: string;
    text: string;
    type: "movie" | "tv" | "person" | "";
    year: string;
    pathname: "/movie/[id]" | "/tv/[id]" | "/person/[id]";
  }>({
    url: "",
    text: "",
    type: "",
    year: "",
    pathname: "/movie/[id]",
  });
  const router = useRouter();

  useEffect(() => {
    switch (item.media_type) {
      case "person":
        setData({
          url: item.profile_path || "",
          text: item.name,
          type: "person",
          year: "",
          pathname: "/person/[id]",
        });
        break;
      case "movie":
        setData({
          url: item.poster_path || "",
          text: item.title,
          type: "movie",
          year: new Date(item.release_date).getFullYear().toString(),
          pathname: "/movie/[id]",
        });
        break;
      case "tv":
        setData({
          url: item.poster_path || "",
          text: item.name,
          type: "tv",
          year: new Date(item.first_air_date).getFullYear().toString(),
          pathname: "/tv/[id]",
        });
        break;
    }
  }, []);

  return (
    <RipplePressable
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
    </RipplePressable>
  );
};

export default SearchItem;
