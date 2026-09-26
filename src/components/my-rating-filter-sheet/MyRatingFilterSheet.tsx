import { RadioGroup } from "@/components/ui/radio";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { View } from "@/components/ui/view";
import {
  setType,
  useMyRatingsFiltersStore,
} from "@/stores/useMyRatingsFiltersStore";
import { MediaType } from "@/types/common.type";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const MyRatingFilterSheet = ({ open, onOpenChange }: Props) => {
  const mediaType = useMyRatingsFiltersStore((s) => s.mediaType);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          {/* <SheetDescription>Adjust your filters below.</SheetDescription> */}
        </SheetHeader>
        <View style={{ paddingHorizontal: 20 }}>
          <RadioGroup
            options={[
              { label: "Movies", value: "movies" },
              { label: "TV Shows", value: "tv" },
              { label: "All", value: "", disabled: true },
            ]}
            value={mediaType}
            onValueChange={(v) => setType(v as MediaType)}
          />
        </View>
      </SheetContent>
    </Sheet>
  );
};

export default MyRatingFilterSheet;
