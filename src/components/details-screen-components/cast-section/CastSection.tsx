import HorizontalScroll from "@/components/layouts/horizontal-scroll/HorizontalScroll";
import RipplePressable from "@/components/ripple-pressable/RipplePressable";
import { Collapsible } from "@/components/ui/collapsible";
import { Image } from "@/components/ui/image";
import { Text } from "@/components/ui/text";
import {
  AggregateCastMember,
  AggregateCrewMember,
  CastMember,
  CrewMember,
} from "@/types/person";
import { CreatedBy } from "@/types/tv";
import { useRouter } from "expo-router";
import { useState } from "react";

type Props = {
  data:
    | CastMember[]
    | CrewMember[]
    | AggregateCastMember[]
    | AggregateCrewMember[]
    | CreatedBy[];
  title: string;
  type: "cast" | "crew" | "created_by";
};

const CastSection = ({ data, title, type }: Props) => {
  if (data.length === 0) return null;

  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const renderData = () => {
    return data.map((item) => {
      const sub =
        "character" in item
          ? item.character
          : "job" in item
            ? item.job
            : "roles" in item
              ? item.roles.map((r) => r.character).join(" / ")
              : "jobs" in item
                ? item.jobs.map((j) => j.job).join(" / ")
                : item.name;
      const episodes =
        type === "cast" && "total_episode_count" in item
          ? item.total_episode_count
          : null;

      return (
        <Component
          key={item.id + sub}
          main={item.name}
          sub={sub}
          img={item.profile_path!}
          episodes={episodes}
          onPress={() =>
            router.navigate({
              pathname: `/person/[id]`,
              params: { id: item.id },
            })
          }
        />
      );
    });
  };

  return (
    <Collapsible title={title} isOpen={isOpen} setIsOpen={setIsOpen}>
      <HorizontalScroll isInSection>{renderData()}</HorizontalScroll>
    </Collapsible>
  );
};

export default CastSection;

const Component = ({
  main,
  sub,
  img,
  episodes,
  onPress,
}: {
  main: string;
  sub: string;
  img: string;
  episodes: number | null;
  onPress: () => void;
}) => (
  <RipplePressable style={{ width: 128 }} onPress={onPress}>
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
    <Text numberOfLines={2} style={{ fontSize: 16, textAlign: "center" }}>
      {main}
    </Text>
    <Text
      variant="caption"
      numberOfLines={2}
      style={{ fontSize: 14, textAlign: "center" }}
    >
      {sub}
    </Text>
    <Text variant="caption" style={{ fontSize: 14, textAlign: "center" }}>
      {episodes}
    </Text>
  </RipplePressable>
);
