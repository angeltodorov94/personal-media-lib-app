import CollectionSheet from "@/components/details-screen-components/extra-section/collection-sheet/CollectionSheet";
import { Button } from "@/components/ui/button";
import { View } from "@/components/ui/view";
import { openImdbTitle } from "@/lib/openImdb";
import { useState } from "react";

type Props = {
  imdb: string | null;
  collectionID?: number;
};

const ExtraSection = ({ imdb, collectionID }: Props) => {
  if (!imdb && !collectionID) return null;

  const [isCollectionOpen, setIsCollectionOpen] = useState(false);

  return (
    <View style={{ flexDirection: "row", gap: 10, paddingHorizontal: 10 }}>
      {collectionID && (
        <>
          <Button
            textStyle={{ fontSize: 16 }}
            variant="outline"
            style={{ flex: 1 }}
            onPress={() => setIsCollectionOpen(true)}
          >
            Collection
          </Button>
          <CollectionSheet
            isOpen={isCollectionOpen}
            id={collectionID}
            close={() => setIsCollectionOpen(false)}
          />
        </>
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
