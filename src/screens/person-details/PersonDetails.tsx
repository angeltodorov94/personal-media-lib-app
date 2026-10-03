import Error from "@/components/common/error/Error";
import Loading from "@/components/common/loading/Loading";
import DetailsPageWrapper from "@/components/details-screen-components/details-page-wrapper/DetailsPageWrapper";
import ExtraSection from "@/components/details-screen-components/extra-section/ExtraSection";
import KnownForSection from "@/components/details-screen-components/known-for-section/KnownForSection";
import MainSection from "@/components/details-screen-components/main-section/MainSection";
import OverviewSection from "@/components/details-screen-components/overview-section/OverviewSection";
import RipplePressable from "@/components/ripple-pressable/RipplePressable";
import { BottomSheet, useBottomSheet } from "@/components/ui/bottom-sheet";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import {
  CreditSortField,
  useGetPersonFullDetails,
} from "@/hooks/api/people/useGetPersonFullDetails";
import { formatDate } from "@/lib/formatDate";
import { getGenderName } from "@/lib/getGenderName";
import { useLocalSearchParams } from "expo-router";
import { Check } from "lucide-react-native";
import { useCallback, useState } from "react";

type BottomSheetSortType = "acting" | "production";

const pickerOptions: { label: string; value: CreditSortField }[] = [
  { label: "Release Date", value: "release_date" },
  { label: "Popularity", value: "popularity" },
  { label: "Vote Count", value: "vote_count" },
  { label: "Vote Average", value: "vote_average" },
];

function PersonDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isVisible, open, close } = useBottomSheet();
  const [typeSheet, setTypeSheet] = useState<BottomSheetSortType>();
  const [sortBy, setSortBy] = useState<
    Record<BottomSheetSortType, CreditSortField>
  >({
    acting: "release_date",
    production: "vote_count",
  });

  const { data, isLoading, isError } = useGetPersonFullDetails(id, {
    cast: sortBy.acting,
    crew: sortBy.production,
  });

  const openBottomSheet = useCallback(
    (t: BottomSheetSortType) => {
      setTypeSheet(t);
      open();
    },
    [open],
  );

  const onPressActing = useCallback(
    () => openBottomSheet("acting"),
    [openBottomSheet],
  );

  const onPressProduction = useCallback(
    () => openBottomSheet("production"),
    [openBottomSheet],
  );

  const handlePick = useCallback(
    (v: CreditSortField) => {
      if (typeSheet) {
        setSortBy((prev) => ({ ...prev, [typeSheet]: v }));
      }

      close();
    },
    [typeSheet, close],
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !data) {
    return <Error />;
  }
  console.log(data.combined_credits.crew);
  return (
    <DetailsPageWrapper>
      <MainSection img={data.profile_path}>
        <View style={{ flex: 1, justifyContent: "space-between" }}>
          <View>
            <Text variant="subtitle">{data.name}</Text>
            <Text variant="caption" style={{ fontWeight: 500 }}>
              {data.known_for_department}
            </Text>
          </View>
          <View>
            <Text>Gender: {getGenderName(data.gender)}</Text>
            {data.birthday && <Text>Born: {formatDate(data.birthday)}</Text>}
            {data.deathday && <Text>Died: {formatDate(data.deathday)}</Text>}
            {data.place_of_birth && <Text>City: {data.place_of_birth}</Text>}
          </View>
        </View>
      </MainSection>
      <OverviewSection overview={data.biography} />
      <KnownForSection
        title="Acting Credits"
        data={data.combined_credits.cast}
        onPress={onPressActing}
      />
      <KnownForSection
        title="Production Credits"
        data={data.combined_credits.crew}
        onPress={onPressProduction}
      />
      <ExtraSection imdb={data.imdb_id} />
      <BottomSheet
        isVisible={isVisible}
        onClose={close}
        title="Sort By"
        snapPoints={[0.4]}
      >
        {pickerOptions.map((o) => (
          <RipplePressable
            key={o.value}
            style={{
              paddingHorizontal: 10,
              paddingVertical: 15,
              flexDirection: "row",
              gap: 10,
            }}
            onPress={() => handlePick(o.value)}
          >
            {typeSheet && sortBy[typeSheet] === o.value && (
              <Icon name={Check} />
            )}
            <Text>{o.label}</Text>
          </RipplePressable>
        ))}
      </BottomSheet>
    </DetailsPageWrapper>
  );
}

export default PersonDetailsScreen;
