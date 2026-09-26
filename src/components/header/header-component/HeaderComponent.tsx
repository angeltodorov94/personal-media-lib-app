import BlurHeaderWrapper, {
  HeaderOptions,
  overlayOpacity,
} from "@/components/header/blur-header-wrapper/BlurHeaderWrapper";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useHeaderHeightStore } from "@/stores/useHeaderHeightStore";
import { HEIGHT } from "@/theme/globals";
import { NativeStackHeaderProps } from "expo-router";
import { BottomTabHeaderProps } from "expo-router/build/react-navigation/bottom-tabs";
import { Animated, useWindowDimensions } from "react-native";

const Placeholder = () => <View style={{ width: HEIGHT }} />;

const HeaderComponent = (
  props: BottomTabHeaderProps | NativeStackHeaderProps,
) => {
  const { rightButton, leftButton, label } = props.options as HeaderOptions;
  const { width } = useWindowDimensions();
  const scrollY = useHeaderHeightStore((s) => s.scrollY);

  return (
    <BlurHeaderWrapper>
      {leftButton ? (
        <Button
          size="icon"
          variant="secondary"
          icon={leftButton.icon}
          onPress={leftButton.onPress}
        />
      ) : (
        <Placeholder />
      )}
      {label && (
        <Animated.View
          style={{
            opacity: overlayOpacity(scrollY),
            width: width - 100 - 2 * 48,
          }}
        >
          <Text
            variant="body"
            style={{
              fontWeight: "600",
              textAlign: "center",
            }}
          >
            {label}
          </Text>
        </Animated.View>
      )}
      {rightButton ? (
        <Button
          size="icon"
          variant="secondary"
          icon={rightButton.icon}
          onPress={rightButton.onPress}
        />
      ) : (
        <Placeholder />
      )}
    </BlurHeaderWrapper>
  );
};

export default HeaderComponent;
