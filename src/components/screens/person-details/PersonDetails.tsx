import PageWrapper from "@/components/details-screen-components/details-page-wrapper/DetailsPageWrapper";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";

function PersonDetails() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      // leftButton: {
      //   icon: Search,
      //   onPress: () => {},
      // },
    });
  }, [navigation]);

  return (
    <PageWrapper>
      <Text>Person: {id}</Text>
    </PageWrapper>
  );
}

export default PersonDetails;
