import MyRatingListComponent from "@/components/my-rating-list-component/MyRatingListComponent";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useGetCollectionDetails } from "@/hooks/api/collection/useGetCollectionDetails";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  isOpen: boolean;
  id: number;
  close: () => void;
};

const CollectionSheet = ({ id, isOpen, close }: Props) => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const { data, isError } = useGetCollectionDetails(String(id), isOpen);

  if (isError || !data) return null;

  return (
    <BottomSheet
      isVisible={isOpen}
      onClose={close}
      title={data.name}
      snapPoints={[0.75]}
      enableBackdropDismiss
    >
      <Text style={{ fontSize: 16, textAlign: "center", marginBottom: 32 }}>
        {data.overview}
      </Text>
      <View
        style={{
          paddingBottom: insets.bottom + 150,
          gap: 10,
          marginHorizontal: -10,
        }}
      >
        {data.parts.map((item) => (
          <MyRatingListComponent
            key={item.id}
            screen="discover"
            item={item}
            onItemPress={() =>
              router.push({
                pathname: `/movie/[id]`,
                params: { id: item.id },
              })
            }
          />
        ))}
      </View>
    </BottomSheet>
  );
};

export default CollectionSheet;
