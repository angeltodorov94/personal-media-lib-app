import {
  clearSorting,
  initSortingState,
  setIsSortingPanelOpen,
  setSorting,
  SortField,
  sortingFields,
  sortingOrder,
  SortState,
  useSortingStore,
} from "@/stores/useSortingStore";
import { SortType } from "@/types/common";
import { useEffect, useState } from "react";
import Loading from "../common/loading/Loading";
import { Button } from "../ui/button";
import { RadioGroup } from "../ui/radio";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";
import { View } from "../ui/view";

type Props = {
  type: "discover" | "ratings";
};

const SortSheet = ({ type }: Props) => {
  const isOpen = useSortingStore((s) =>
    type === "discover" ? s.isDiscoverSortPanelOpen : s.isRatingsSortPanelOpen,
  );

  const sortingStore = useSortingStore((s) =>
    type === "ratings" ? s.ratingsSortPanel : s.discoverSortPanel,
  );
  const [sortState, setSortState] = useState<SortState>(sortingStore);

  useEffect(() => {
    if (isOpen) setSortState(sortingStore);
  }, [isOpen, type, sortingStore]);

  if (!sortState) {
    return <Loading />;
  }

  return (
    <Sheet
      side="left"
      open={isOpen}
      onOpenChange={(v) => setIsSortingPanelOpen(type, v)}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sorting</SheetTitle>
        </SheetHeader>
        <View style={{ paddingHorizontal: 20, gap: 20 }}>
          <RadioGroup
            orientation="horizontal"
            options={sortingOrder}
            value={sortState.orderBy}
            onValueChange={(v) =>
              setSortState((prev) => ({ ...prev, orderBy: v as SortType }))
            }
            labelStyle={{ fontSize: 16 }}
          />
          {type === "discover" && (
            <RadioGroup
              options={sortingFields}
              value={sortState.sortBy}
              onValueChange={(v) =>
                setSortState((prev) => ({
                  ...prev,
                  sortBy: v as SortField,
                }))
              }
              labelStyle={{ fontSize: 16 }}
            />
          )}
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Button
              variant="secondary"
              size="sm"
              style={{ flex: 1 }}
              disabled={
                JSON.stringify(sortState) === JSON.stringify(initSortingState)
              }
              textStyle={{ fontSize: 16 }}
              onPress={() => clearSorting(type)}
            >
              Clear
            </Button>
            <Button
              variant="default"
              size="sm"
              disabled={
                JSON.stringify(sortState) === JSON.stringify(sortingStore)
              }
              style={{ flex: 1 }}
              textStyle={{ fontSize: 16 }}
              onPress={() => setSorting(type, sortState)}
            >
              Apply
            </Button>
          </View>
        </View>
      </SheetContent>
    </Sheet>
  );
};

export default SortSheet;
