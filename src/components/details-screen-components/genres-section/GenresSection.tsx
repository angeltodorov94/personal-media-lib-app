import RipplePressable from "@/components/ripple-pressable/RipplePressable";
import { Badge } from "@/components/ui/badge";
import { View } from "@/components/ui/view";
import { useDiscoverFilterNavigation } from "@/hooks/useDiscoverFilterNavigation";
import { CORNERS } from "@/theme/globals";
import { Genre } from "@/types/common";

type Props = {
  genres: Genre[];
  type: "movie" | "tv";
};

const GenresSection = ({ genres, type }: Props) => {
  const { filterByGenre } = useDiscoverFilterNavigation(type);

  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 6,
        paddingHorizontal: 10,
      }}
    >
      {genres.map((g) => (
        <RipplePressable
          key={g.id}
          style={{ borderRadius: CORNERS, overflow: "hidden" }}
          onPress={() => filterByGenre(g)}
        >
          <Badge>{g.name}</Badge>
        </RipplePressable>
      ))}
    </View>
  );
};

export default GenresSection;
