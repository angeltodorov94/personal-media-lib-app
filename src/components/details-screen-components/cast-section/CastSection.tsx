import { Collapsible } from "@/components/ui/collapsible";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import {
  AggregateCastMember,
  CastMember,
  CrewMember,
} from "@/types/person-types";
import { CreatedBy } from "@/types/tv-shows-type";
import { useState } from "react";
import { ScrollView } from "react-native";

type Props = {
  data: CastMember[] | CrewMember[] | AggregateCastMember[] | CreatedBy[];
  title: string;
};

const CastSection = ({ data, title }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const renderData = () => {
    return data.map((item) => {
      const sub =
        "character" in item
          ? item.character
          : "job" in item
            ? item.job
            : "roles" in item
              ? item.roles.map((r) => r.character).join(" / ")
              : item.name;
      const episodes =
        "total_episode_count" in item ? item.total_episode_count : null;

      return (
        <Component
          key={item.id + sub}
          main={item.name}
          sub={sub}
          img={item.profile_path!}
          episodes={episodes}
        />
      );
    });
  };

  return (
    <Collapsible title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={{
          gap: 10,
          paddingLeft: 34,
          paddingRight: 10,
          marginTop: 5,
        }}
      >
        {renderData()}
      </ScrollView>
    </Collapsible>
  );
};

export default CastSection;

const Component = ({
  main,
  sub,
  img,
  episodes,
}: {
  main: string;
  sub: string;
  img: string;
  episodes: number | null;
}) => (
  <View style={{ width: 128 }}>
    <Image
      source={{
        uri: `https://image.tmdb.org/t/p/h632${img}`,
      }}
      alt="Alt image"
      height={128}
      width={128}
      variant="circle"
      contentPosition="center"
    />
    <Text numberOfLines={2} style={{ fontSize: 16 }}>
      {main}
    </Text>
    <Text variant="caption" numberOfLines={2} style={{ fontSize: 14 }}>
      {sub}
    </Text>
    <Text variant="caption" style={{ fontSize: 14 }}>
      {episodes}
    </Text>
  </View>
);
