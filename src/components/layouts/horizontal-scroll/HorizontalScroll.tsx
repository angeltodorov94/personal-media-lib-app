import { ScrollView } from "@/components/ui/scroll-view";
import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  isInSection?: boolean;
}>;

const HorizontalScroll = ({ children, isInSection = false }: Props) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      nestedScrollEnabled
      contentContainerStyle={{
        gap: 10,
        paddingRight: 10,
        paddingLeft: isInSection ? 34 : 10,
        marginTop: 10,
      }}
    >
      {children}
    </ScrollView>
  );
};

export default HorizontalScroll;
