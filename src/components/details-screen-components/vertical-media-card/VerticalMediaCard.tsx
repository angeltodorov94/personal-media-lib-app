import RipplePressable from "@/components/ripple-pressable/RipplePressable";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { MovieSummary } from "@/types/movie";
import { CombinedCastCredit, CombinedCrewCredit } from "@/types/person";
import { TVSummary } from "@/types/tv";
import { Dot } from "lucide-react-native";
import { StyleSheet } from "react-native";

type Props = {
  item: MovieSummary | TVSummary | CombinedCastCredit | CombinedCrewCredit;
  onPress: () => void;
};

const VerticalMediaCard = ({ item, onPress }: Props) => {
  const ratingColor = useColor("info");
  const title = "title" in item ? item.title : item.name;
  const releaseDate =
    "first_air_date" in item ? item.first_air_date : item.release_date;
  // TMDB sends "" (or omits the field) when the date is unknown
  const year = releaseDate ? new Date(releaseDate).getFullYear() : null;

  return (
    <RipplePressable style={{ width: 128 }} onPress={onPress}>
      <Image
        source={{
          uri: `https://image.tmdb.org/t/p/w342${item.poster_path}`,
        }}
        alt={title}
        width={128}
        aspectRatio={2 / 3}
        variant="default"
        containerStyle={s.imgContainer}
      />
      <Text numberOfLines={2} style={{ fontSize: 16 }}>
        {title}
      </Text>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        {year !== null && (
          <Text variant="caption" style={{ fontSize: 14 }}>
            {year}
          </Text>
        )}
        {year !== null && !!item.vote_average && <Icon name={Dot} />}
        {!!item.vote_average && (
          <Text
            style={{ fontSize: 14, color: ratingColor, fontWeight: "bold" }}
          >
            {item.vote_average.toPrecision(2)}
          </Text>
        )}
      </View>
    </RipplePressable>
  );
};

export default VerticalMediaCard;

const s = StyleSheet.create({
  imgContainer: {
    borderRadius: 4,
    marginBottom: 2,
  },
});
