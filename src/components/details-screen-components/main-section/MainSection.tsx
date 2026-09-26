import { Image } from "@/components/ui/image";
import { Progress } from "@/components/ui/progress";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useColor } from "@/hooks/useColor";
import { AccountStates } from "@/types/common.type";
import { PropsWithChildren } from "react";
import { useWindowDimensions } from "react-native";

type Props = PropsWithChildren & {
  img: string | null;
  vote_average: number;
  account_states: AccountStates;
};

const MainSection = ({
  account_states,
  img,
  vote_average,
  children,
}: Props) => {
  const barBackgroundColor = useColor("secondary");
  const { width } = useWindowDimensions();

  const getBarColor = (v: number) => {
    if (v >= 70) return "success";
    if (v >= 60) return "yellow";

    return "error";
  };

  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingTop: 10,
        gap: 10,
        flexDirection: "row",
      }}
    >
      {img && (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w780${img}`,
          }}
          alt="Something went wrong"
          width={(width - 3 * 10) / 2}
          aspectRatio={2 / 3}
          variant="default"
          containerStyle={{ borderRadius: 4 }}
        />
      )}
      <View
        style={{
          flex: 1,
          justifyContent: "space-between",
          paddingBottom: 6,
        }}
      >
        <View>{children}</View>
        <View style={{ gap: 10 }}>
          <View style={{ gap: 4 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text
                // variant="caption"
                style={{ fontSize: 14, fontWeight: "600" }}
              >
                User Score
              </Text>
              <Text
                // variant="caption"
                style={{ fontSize: 14, fontWeight: "600" }}
              >
                {Math.round(vote_average * 10)}%
              </Text>
            </View>
            <Progress
              height={12}
              value={Math.round(vote_average * 10)}
              style={{ backgroundColor: barBackgroundColor }}
              barColor={"info"}
            />
          </View>
          {account_states.rated && (
            <View style={{ gap: 4 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  // variant="caption"
                  style={{ fontSize: 14, fontWeight: "600" }}
                >
                  My Score
                </Text>
                <Text
                  // variant="caption"
                  style={{ fontSize: 14, fontWeight: "600" }}
                >
                  {account_states.rated.value * 10}%
                </Text>
              </View>
              <Progress
                height={12}
                value={account_states.rated.value * 10}
                style={{ backgroundColor: barBackgroundColor }}
                barColor={getBarColor(account_states.rated.value * 10)}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default MainSection;
