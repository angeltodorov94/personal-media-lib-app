import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { getBarColor } from "@/lib/getBarColor";
import { MovieSummary, RatedMovie, TrendingMovie } from "@/types/movie";
import { RatedTVShow, TrendingTVShow, TVSummary } from "@/types/tv";
import { StyleSheet } from "react-native";
import { ProgressRingChart } from "../charts/progress-ring-chart";
import RipplePressable from "../ripple-pressable/RipplePressable";

type Props = {
  item:
    | RatedMovie
    | RatedTVShow
    | TrendingMovie
    | TrendingTVShow
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
    <RipplePressable style={s.container} onPress={onItemPress}>
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
        <RipplePressable onPress={onRatingPress} hitSlop={20}>
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
        </RipplePressable>
      )}
    </RipplePressable>
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
