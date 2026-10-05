import FormatBadges from "@/components/format-badges/FormatBadges";
import RipplePressable from "@/components/ripple-pressable/RipplePressable";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { ListItem } from "@/types/list";
import { ExternalLink } from "lucide-react-native";
import { StyleSheet } from "react-native";

type Props = {
  item: ListItem;
  /** The note attached to this item in the list, one entry per line */
  commentLines?: string[];
  onItemPress?: () => void;
};

const CollectionListItem = ({ item, commentLines, onItemPress }: Props) => {
  const { title, originalTitle, releaseDate } =
    item.media_type === "movie"
      ? {
          title: item.title,
          originalTitle: item.original_title,
          releaseDate: item.release_date,
        }
      : {
          title: item.name,
          originalTitle: item.original_name,
          releaseDate: item.first_air_date,
        };

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
        <Text variant="subtitle" numberOfLines={1} style={{ marginBottom: 10 }}>
          {title}
        </Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text
            variant="caption"
            style={{ fontSize: 16, fontWeight: "500", marginTop: -2 }}
          >
            {new Date(releaseDate).getFullYear()}
          </Text>
          <FormatBadges />
        </View>
      </View>
      <Button variant="secondary" size="icon">
        <Icon name={ExternalLink} />
      </Button>
    </RipplePressable>
  );
};

export default CollectionListItem;

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    gap: 10,
  },
});
