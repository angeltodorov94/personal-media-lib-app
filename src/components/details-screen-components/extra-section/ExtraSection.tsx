import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";
import { openImdbTitle } from "@/lib/openImdb";

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
          textStyle={{ fontSize: 16, color: "black", fontWeight: "bold" }}
          style={{ flex: 1, backgroundColor: "#f5c518" }}
          onPress={() => openImdbTitle(imdb)}
        >
          IMDB Link
        </Button>
      )}
    </View>
  );
};

export default ExtraSection;
