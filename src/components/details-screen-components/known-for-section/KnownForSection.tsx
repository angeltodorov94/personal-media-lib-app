import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { CombinedCastCredit, CombinedCrewCredit } from "@/types/person";
import { useRouter } from "expo-router";
import { ListFilter } from "lucide-react-native";
import { memo } from "react";
import { FlatList, StyleSheet } from "react-native";
import VerticalMediaCard from "../vertical-media-card/VerticalMediaCard";

type Props = {
  title: string;
  data: (CombinedCastCredit | CombinedCrewCredit)[];
  onPress: () => void;
};

const KnownForSection = ({ data, title, onPress }: Props) => {
  const router = useRouter();

  if (!data.length) return null;

  return (
    <View>
      <View style={s.headerContainer}>
        <Text variant="subtitle">{title}</Text>
        <Button
          size="icon"
          variant="ghost"
          style={{ height: 26 }}
          onPress={onPress}
        >
          <Icon name={ListFilter} size={16} />
        </Button>
      </View>
      <FlatList
        horizontal
        contentContainerStyle={s.contentContainer}
        data={data}
        keyExtractor={(item) => item.credit_id}
        renderItem={({ item }) => (
          <VerticalMediaCard
            item={item}
            onPress={() =>
              router.navigate({
                pathname: `/${item.media_type}/[id]`,
                params: { id: item.id },
              })
            }
          />
        )}
      />
    </View>
  );
};

export default memo(KnownForSection);

const s = StyleSheet.create({
  contentContainer: {
    gap: 10,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  headerContainer: {
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
