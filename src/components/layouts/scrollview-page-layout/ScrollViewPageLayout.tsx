import { useHeaderHeightStore } from "@/stores/useHeaderHeightStore";
import { useFocusEffect } from "expo-router";
import { PropsWithChildren, useCallback, useRef } from "react";
import { Animated, ScrollView, StyleProp, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

const ScrollViewPageLayout = ({ children, style }: Props) => {
  const scrollY = useHeaderHeightStore((s) => s.scrollY);
  const height = useHeaderHeightStore((s) => s.height);
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

  return (
    <Animated.ScrollView
      ref={ref}
      scrollEventThrottle={16}
      contentContainerStyle={[
        {
          flexGrow: 1,
          paddingTop: height,
          paddingBottom: 10,
          gap: 20,
        },
        style,
      ]}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled
      onScroll={onScroll}
    >
      {children}
    </Animated.ScrollView>
  );
};

export default ScrollViewPageLayout;
