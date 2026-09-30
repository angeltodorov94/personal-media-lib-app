import ScrollViewPageLayout from "@/components/layouts/scrollview-page-layout/ScrollViewPageLayout";
import { useNavigation, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { PropsWithChildren, useLayoutEffect } from "react";

const DetailsPageWrapper = ({ children }: PropsWithChildren) => {
  const navigation = useNavigation();
  const router = useRouter();

  useLayoutEffect(() => {
    navigation.setOptions({
      leftButton: { icon: ArrowLeft, onPress: () => router.back() },
    });
  }, [navigation]);

  return <ScrollViewPageLayout>{children}</ScrollViewPageLayout>;
};

export default DetailsPageWrapper;
