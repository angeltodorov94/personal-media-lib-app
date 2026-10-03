import { ScrollView } from "@/components/ui/scroll-view";
import { PropsWithChildren } from "react";
import { StyleProp, ViewStyle } from "react-native";

type Props = PropsWithChildren<{
  style?: StyleProp<ViewStyle>;
}>;

const HorizontalScroll = ({ children, style }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
      contentContainerStyle={[
        {
          gap: 10,
          paddingHorizontal: 10,
          marginTop: 5,
        },
        style,
      ]}
    >
      {children}
    </ScrollView>
  );
};

export default HorizontalScroll;
