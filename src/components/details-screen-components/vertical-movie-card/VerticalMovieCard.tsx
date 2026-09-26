import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { MovieSummary } from "@/types/movie-types";
import { TVSummary } from "@/types/tv-shows-type";
import { StyleSheet, TouchableOpacity } from "react-native";

type Props = {
  item: MovieSummary | TVSummary;
  onPress: () => void;
};

const VerticalMovieCard = ({ item, onPress }: Props) => {
  const title = "title" in item ? item.title : item.name;
  const releaseDate =
    "first_air_date" in item ? item.first_air_date : item.release_date;

  return (
    <TouchableOpacity style={{ width: 128 }} onPress={onPress}>
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
      <Text variant="caption" style={{ fontSize: 14 }}>
        {new Date(releaseDate).getFullYear()}
      </Text>
    </TouchableOpacity>
  );
};

export default VerticalMovieCard;

const s = StyleSheet.create({
  imgContainer: {
    borderRadius: 4,
    marginBottom: 2,
  },
});
