import RipplePressable from "@/components/ripple-pressable/RipplePressable";
import { Badge } from "@/components/ui/badge";
import { Collapsible } from "@/components/ui/collapsible";
import { View } from "@/components/ui/view";
import { useDiscoverFilterNavigation } from "@/hooks/useDiscoverFilterNavigation";
import { CORNERS } from "@/theme/globals";
import { Keyword } from "@/types/common";
import { useState } from "react";

type Props = {
  data: Keyword[];
  type: "movie" | "tv";
};

const KeywordsSection = ({ data, type }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { filterByKeyword } = useDiscoverFilterNavigation(type);

  return (
    <Collapsible title="Keywords" isOpen={isOpen} setIsOpen={setIsOpen}>
      <View
        style={{
          flexDirection: "row",
          gap: 6,
          flexWrap: "wrap",
          paddingLeft: 34,
          paddingRight: 10,
          marginTop: 5,
        }}
      >
        {data.map((k) => (
          <RipplePressable
            key={k.id}
            style={{ borderRadius: CORNERS, overflow: "hidden" }}
            onPress={() => filterByKeyword(k)}
          >
            <Badge variant="outline">{k.name}</Badge>
          </RipplePressable>
        ))}
      </View>
    </Collapsible>
  );
};

export default KeywordsSection;
