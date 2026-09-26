import { Badge } from "@/components/ui/badge";
import { Collapsible } from "@/components/ui/collapsible";
import { View } from "@/components/ui/view";
import { Keyword } from "@/types/common.type";
import { useState } from "react";

type Props = {
  data: Keyword[];
};

const KeywordsSection = ({ data }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <Badge key={k.id} variant="outline">
            {k.name}
          </Badge>
        ))}
      </View>
    </Collapsible>
  );
};

export default KeywordsSection;
