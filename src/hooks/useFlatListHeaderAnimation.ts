import { useHeaderHeightStore } from "@/stores/useHeaderHeightStore";
import { useFocusEffect } from "expo-router";
import { useCallback, useRef } from "react";
import { Animated, FlatList } from "react-native";

export function useFlatListHeaderAnimation<T>() {
  const ref = useRef<FlatList<T>>(null);
  const { height, scrollY } = useHeaderHeightStore();

  // 1. Scroll animation handler for Animated.FlatList
  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    { useNativeDriver: true },
  );

  // 2. Reset scroll position on screen blur / focus change
  useFocusEffect(
    useCallback(() => {
      return () => {
        scrollY.setValue(0);
        ref.current?.scrollToOffset({ offset: 0, animated: false });
      };
    }, [scrollY]),
  );

  return {
    ref,
    onScroll,
    height,
  };
}
