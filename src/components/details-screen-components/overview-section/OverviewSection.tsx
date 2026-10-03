import RipplePressable from "@/components/ripple-pressable/RipplePressable";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useState } from "react";

type Props = {
  overview: string | null;
};

const OverviewSection = ({ overview }: Props) => {
  if (!overview) return null;

  const [linesN, setLinesN] = useState<number | undefined>(4);

  return (
    <View style={{ paddingHorizontal: 10, gap: 10 }}>
      <Text variant="subtitle">Overview</Text>
      <RipplePressable onPress={() => setLinesN(linesN ? undefined : 4)}>
        <Text numberOfLines={linesN} style={{ fontSize: 16 }}>
          {overview}
        </Text>
      </RipplePressable>
    </View>
  );
};

export default OverviewSection;
