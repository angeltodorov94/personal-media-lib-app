import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";

type Props = {
  imdb: string | null;
  collectionID?: number;
};

const ExtraSection = ({ imdb, collectionID }: Props) => {
  if (!imdb && !collectionID) return null;

  return (
    <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 10 }}>
      {collectionID && (
        <Button
          textStyle={{ fontSize: 16 }}
          variant="outline"
          style={{ flex: 1 }}
          onPress={() => {}}
        >
          Collection
        </Button>
      )}
      {imdb && (
        <Button
          textStyle={{ fontSize: 16, color: "black" }}
          style={{ flex: 1, backgroundColor: "#f5c518" }}
          onPress={() => {}}
        >
          IMDB Link
        </Button>
      )}
    </View>
  );
};

export default ExtraSection;
