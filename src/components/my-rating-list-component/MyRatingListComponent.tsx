import { Badge } from "@/components/ui/badge";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { RatedMovie, TradingMovie } from "@/types/movie-types";
import { RatedTVShow, TradingTVShow } from "@/types/tv-shows-type";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  item: RatedMovie | RatedTVShow | TradingMovie | TradingTVShow;
  onRatingPress?: () => void;
  onItemPress?: () => void;
};

const MyRatingListComponent = ({ item, onRatingPress, onItemPress }: Props) => {
  const badgeAccentColor = useColor("text");
  const title = "title" in item ? item.title : item.name;
  const originalTitle =
    "original_title" in item ? item.original_title : item.original_name;
  const releaseDate =
    "first_air_date" in item ? item.first_air_date : item.release_date;
  const rating = "rating" in item ? item.rating : null;

  return (
    <TouchableOpacity style={s.container} onPress={onItemPress}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w154${item.poster_path}`,
        }}
        alt={title}
        width={50}
        aspectRatio={2 / 3}
        variant="default"
        containerStyle={{ borderRadius: 4 }}
      />
      <View style={{ flex: 1 }}>
        <Text variant="subtitle">{title}</Text>
        {title !== originalTitle && (
          <Text variant="caption" style={{ fontSize: 14 }}>
            {originalTitle}
          </Text>
        )}
        <Text variant="caption" style={{ fontSize: 14 }}>
          {new Date(releaseDate).getFullYear()}
        </Text>
      </View>
      {rating && (
        <TouchableOpacity onPress={onRatingPress} hitSlop={20}>
          <Badge
            style={{
              width: 50,
              borderRadius: 8,
              backgroundColor: "#f5c518",
              borderWidth: 2,
              borderColor: badgeAccentColor,
            }}
            textStyle={{
              fontSize: 12,
              fontWeight: "bold",
              color: badgeAccentColor,
            }}
          >
            {rating}
          </Badge>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default MyRatingListComponent;

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
});
