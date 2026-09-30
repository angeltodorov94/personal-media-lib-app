import { RadioGroup } from "@/components/ui/radio";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { View } from "@/components/ui/view";
import { useGetCountries } from "@/hooks/api/country/useGetCountries";
import { useGetGenres } from "@/hooks/api/genre/useGetGenres";
import {
  clearFilters,
  FiltersType,
  initFilterState,
  setFilterMediaType,
  setFilters,
  setIsFilterPanelOpen,
  useFiltersStore,
} from "@/stores/useFiltersStore";
import { MediaType } from "@/types/common";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  Star,
  StarHalf,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import Loading from "../common/loading/Loading";
import { Button } from "../ui/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from "../ui/combobox";
import { GroupedInput, GroupedInputItem } from "../ui/input";

type Props = {
  type: "discover" | "ratings";
};

const FilterSheet = ({ type }: Props) => {
  const isOpen = useFiltersStore((s) =>
    type === "discover"
      ? s.isDiscoverFilterPanelOpen
      : s.isRatingsFilterPanelOpen,
  );

  const mediaType = useFiltersStore((s) =>
    type === "ratings" ? s.ratingsScreenMediaType : s.discoverScreenMediaType,
  );
  const filterStore = useFiltersStore((s) =>
    type === "ratings" ? s.ratingsScreenFilters : s.discoverScreenFilters,
  );
  const [filterState, setFilterState] = useState<FiltersType>(filterStore);

  const countries = useGetCountries();
  const genres = useGetGenres(mediaType === "movies" ? "movie" : "tv");

  useEffect(() => {
    if (isOpen) setFilterState(filterStore);
  }, [isOpen, type, filterStore]);

  if (!filterState) {
    return <Loading />;
  }

  return (
    <Sheet open={isOpen} onOpenChange={(v) => setIsFilterPanelOpen(type, v)}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          {/* <SheetDescription>Adjust your filters below.</SheetDescription> */}
        </SheetHeader>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <RadioGroup
            orientation="horizontal"
            options={[
              { label: "Movies", value: "movies" },
              { label: "TV Shows", value: "tv" },
              // { label: "All", value: "", disabled: true },
            ]}
            value={mediaType}
            onValueChange={(v) => setFilterMediaType(type, v as MediaType)}
            labelStyle={{ fontSize: 16 }}
          />
          {type === "discover" && (
            <>
              <Combobox
                values={filterState.countries}
                multiple
                onValuesChange={(c) => {
                  const countries = c.sort((a, b) =>
                    a.value.localeCompare(b.value),
                  );
                  setFilterState((s) => ({ ...s, countries }));
                }}
              >
                <ComboboxTrigger>
                  <ComboboxValue placeholder="Select Country..." />
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxInput placeholder="Search..." autoFocus={false} />
                  <ComboboxList>
                    <ComboboxEmpty>No countries found.</ComboboxEmpty>
                    {countries.data?.map((c) => (
                      <ComboboxItem key={c.iso_3166_1} value={c.iso_3166_1}>
                        {c.english_name}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <Combobox
                values={filterState.genres}
                multiple
                onValuesChange={(g) => {
                  const genres = g.sort((a, b) =>
                    a.value.localeCompare(b.value),
                  );
                  setFilterState((s) => ({ ...s, genres }));
                }}
              >
                <ComboboxTrigger>
                  <ComboboxValue placeholder="Select Genre..." />
                </ComboboxTrigger>
                <ComboboxContent>
                  <ComboboxInput placeholder="Search..." autoFocus={false} />
                  <ComboboxList>
                    <ComboboxEmpty>No genres found.</ComboboxEmpty>
                    {genres.data?.genres.map((g) => (
                      <ComboboxItem key={g.id} value={g.id.toString()}>
                        {g.name}
                      </ComboboxItem>
                    ))}
                  </ComboboxList>
                </ComboboxContent>
              </Combobox>
              <GroupedInput>
                <GroupedInputItem
                  label="Min Rating"
                  icon={StarHalf}
                  value={filterState.minRating}
                  onChangeText={(minRating) =>
                    setFilterState((s) => ({ ...s, minRating }))
                  }
                  keyboardType="number-pad"
                  maxLength={2}
                />
                <GroupedInputItem
                  label="Max Rating"
                  icon={Star}
                  value={filterState.maxRating}
                  onChangeText={(maxRating) =>
                    setFilterState((s) => ({ ...s, maxRating }))
                  }
                  keyboardType="number-pad"
                  maxLength={2}
                />
              </GroupedInput>
              <GroupedInput>
                <GroupedInputItem
                  label="Start Year"
                  icon={CalendarArrowDown}
                  value={filterState.minYear}
                  onChangeText={(minYear) =>
                    setFilterState((s) => ({ ...s, minYear }))
                  }
                  keyboardType="number-pad"
                />
                <GroupedInputItem
                  label="End Year"
                  icon={CalendarArrowUp}
                  value={filterState.maxYear}
                  onChangeText={(maxYear) =>
                    setFilterState((s) => ({ ...s, maxYear }))
                  }
                  keyboardType="number-pad"
                />
              </GroupedInput>
            </>
          )}
          {type === "discover" && (
            <View style={{ flexDirection: "row", gap: 10 }}>
              <Button
                variant="secondary"
                size="sm"
                disabled={
                  JSON.stringify(filterState) ===
                  JSON.stringify(initFilterState)
                }
                style={{ flex: 1 }}
                textStyle={{ fontSize: 16 }}
                onPress={() => clearFilters(type)}
              >
                Clear
              </Button>
              <Button
                variant="default"
                size="sm"
                disabled={
                  JSON.stringify(filterState) ===
                  JSON.stringify(initFilterState)
                }
                style={{ flex: 1 }}
                textStyle={{ fontSize: 16 }}
                onPress={() => setFilters(type, filterState)}
              >
                Apply
              </Button>
            </View>
          )}
        </View>
      </SheetContent>
    </Sheet>
  );
};

export default FilterSheet;
