import { Animated } from "react-native";
import { create } from "zustand";

export const useHeaderHeightStore = create<{
  height: number;
  scrollY: Animated.Value;
}>(() => ({
  height: 0,
  scrollY: new Animated.Value(0),
}));

export const setHeight = (height: number) =>
  useHeaderHeightStore.setState({ height });
