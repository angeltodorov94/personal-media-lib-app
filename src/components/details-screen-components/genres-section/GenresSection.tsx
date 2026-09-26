import { Badge } from "@/components/ui/badge";
import { View } from "@/components/ui/view";
import { Genre } from "@/types/common.type";

type Props = {
  genres: Genre[];
};

const GenresSection = ({ genres }: Props) => {
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
        <Badge key={g.id}>{g.name}</Badge>
      ))}
    </View>
  );
};

export default GenresSection;
