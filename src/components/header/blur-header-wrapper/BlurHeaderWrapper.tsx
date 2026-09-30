import { ButtonVariant } from "@/components/ui/button";
import { useColor } from "@/hooks/useColor";
import { useColorScheme } from "@/hooks/useColorScheme";
import { setHeight, useHeaderHeightStore } from "@/stores/useHeaderHeightStore";
import { BlurView } from "expo-blur";
import { LucideProps } from "lucide-react-native";
import { ComponentType, PropsWithChildren } from "react";
import { Animated, LayoutChangeEvent, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View } from "../../ui/view";

export type HeaderOptions = {
  rightButton?: {
    icon: ComponentType<LucideProps>;
    type?: ButtonVariant;
    onPress: () => void;
  };
  leftButton?: {
    icon: ComponentType<LucideProps>;
    type?: ButtonVariant;
    onPress: () => void;
  };
  label?: string;
};

export const overlayOpacity = (v: Animated.Value) =>
  v.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });

const BlurHeaderWrapper = (prop: PropsWithChildren) => {
  const scrollY = useHeaderHeightStore((s) => s.scrollY);
  const backgroundColor = useColor("background");
  const colorScheme = useColorScheme();
  const insets = useSafeAreaInsets();

  const onLayout = (e: LayoutChangeEvent) => {
    setHeight(e.nativeEvent.layout.height);
  };

  return (
    <View onLayout={onLayout}>
      <BlurView
        style={StyleSheet.absoluteFill}
        intensity={100}
        tint={colorScheme === "dark" ? "dark" : "light"}
      />
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor,
            opacity: overlayOpacity(scrollY),
          },
        ]}
      />
      <View style={[s.container, { marginTop: insets.top }]}>
        {prop.children}
      </View>
    </View>
  );
};

export default BlurHeaderWrapper;

const s = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
});
