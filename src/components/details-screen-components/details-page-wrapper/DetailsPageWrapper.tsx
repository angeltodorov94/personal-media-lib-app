import { useHeaderHeightStore } from "@/stores/useHeaderHeightStore";
import { useFocusEffect, useNavigation, useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { PropsWithChildren, useCallback, useLayoutEffect, useRef } from "react";
import { Animated, ScrollView } from "react-native";

const DetailsPageWrapper = ({ children }: PropsWithChildren) => {
  const scrollY = useHeaderHeightStore((s) => s.scrollY);
  const height = useHeaderHeightStore((s) => s.height);
  const navigation = useNavigation();
  const router = useRouter();
  const ref = useRef<ScrollView>(null);

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: false },
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollY.setValue(0);
        ref.current?.scrollTo({ x: 0, animated: false });
      };
    }, [scrollY]),
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      leftButton: { icon: ArrowLeft, onPress: () => router.back() },
    });
  }, [navigation]);

  return (
    <ScrollView
      ref={ref}
      contentContainerStyle={{
        flexGrow: 1,
        paddingTop: height,
        paddingBottom: 10,
        gap: 20,
      }}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      onScroll={onScroll}
    >
      {children}
    </ScrollView>
  );
};

export default DetailsPageWrapper;
