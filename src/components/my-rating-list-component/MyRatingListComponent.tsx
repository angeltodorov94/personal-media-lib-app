import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { getBarColor } from "@/lib/getBarColor";
import { MovieSummary, RatedMovie, TradingMovie } from "@/types/movie-types";
import { RatedTVShow, TradingTVShow, TVSummary } from "@/types/tv-shows-type";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ProgressRingChart } from "../charts/progress-ring-chart";

type Props = {
  item:
    | RatedMovie
    | RatedTVShow
    | TradingMovie
    | TradingTVShow
    | MovieSummary
    | TVSummary;
  screen: "discover" | "ratings";
  onRatingPress?: () => void;
  onItemPress?: () => void;
};

const MyRatingListComponent = ({
  item,
  screen,
  onRatingPress,
  onItemPress,
}: Props) => {
  const title = "title" in item ? item.title : item.name;
  const originalTitle =
    "original_title" in item ? item.original_title : item.original_name;
  const releaseDate =
    "first_air_date" in item ? item.first_air_date : item.release_date;
  const rating =
    "rating" in item
      ? item.rating
      : screen === "discover"
        ? item.vote_average
        : null;

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
        <Text variant="subtitle" numberOfLines={1}>
          {title}
        </Text>
        {title !== originalTitle && (
          <Text variant="caption" numberOfLines={1} style={{ fontSize: 14 }}>
            {originalTitle}
          </Text>
        )}
        <Text variant="caption" style={{ fontSize: 14 }}>
          {new Date(releaseDate).getFullYear()}
        </Text>
      </View>
      {rating && (
        <TouchableOpacity onPress={onRatingPress} hitSlop={20}>
          <ProgressRingChart
            progress={rating * 10}
            size={50}
            strokeWidth={5}
            config={{
              animated: true,
              duration: 1000,
            }}
            centerText={Math.round(rating * 10).toString()}
            strokeColor={
              screen === "discover" ? "info" : getBarColor(rating * 10)
            }
          />
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
