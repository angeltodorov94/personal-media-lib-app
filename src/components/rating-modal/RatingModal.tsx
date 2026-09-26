import { AlertDialog } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useAddRating } from "@/hooks/api/rating/useAddRating";
import { useDeleteRating } from "@/hooks/api/rating/useDeleteRating";
import { useColor } from "@/hooks/useColor";
import { RatedMovie } from "@/types/movie-types";
import { RatedTVShow } from "@/types/tv-shows-type";
import {
  Star,
  StarHalf,
  StarMinus,
  StarPlus,
  StarX,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

const TOTAL_STARS = 10;
const GOLD = "#f5c518";

type Props = {
  item: RatedMovie | RatedTVShow | null;
  onClose: () => void;
};

const RatingModal = ({ item, onClose }: Props) => {
  const originalRating = item?.rating || 0;
  const originalTitle = !item
    ? ""
    : "original_title" in item
      ? item.title
      : item.name;
  const releaseDate = !item
    ? ""
    : "first_air_date" in item
      ? item.first_air_date
      : item.release_date;
  const iconColor = useColor("icon");
  const removeColor = useColor("destructive");
  const addColor = useColor("success");

  const [rating, setRating] = useState(originalRating);
  const {
    mutate: mutateDelete,
    isPending: isPendingDelete,
    isSuccess: isSuccessDelete,
    reset: resetDelete,
  } = useDeleteRating(
    !item ? "movie" : "first_air_date" in item ? "tv" : "movie",
    !item ? 0 : item.id,
  );
  const {
    mutate: mutateAdd,
    isPending: isPendingAdd,
    isSuccess: isSuccessAdd,
    reset: resetAdd,
  } = useAddRating(
    !item ? "movie" : "first_air_date" in item ? "tv" : "movie",
    !item ? 0 : item.id,
    rating,
  );

  useEffect(() => {
    setRating(originalRating);
  }, [item]);

  useEffect(() => {
    if (isSuccessDelete) {
      resetDelete();
    }

    if (isSuccessAdd) {
      resetAdd();
    }

    onClose();
  }, [isSuccessDelete, isSuccessAdd]);

  const handleStarPress = (index: number) => {
    const fullValue = index + 1;

    if (rating === fullValue) {
      setRating(fullValue - 0.5);
    } else {
      setRating(fullValue);
    }
  };

  const renderStars = () => {
    return Array.from({ length: TOTAL_STARS }, (_, i) => {
      const starValue = i + 1;
      const isFull = rating >= starValue;
      const isHalf = !isFull && rating >= starValue - 0.5;

      return (
        <TouchableOpacity
          key={i}
          hitSlop={6}
          disabled={isPendingDelete}
          onPress={() => handleStarPress(i)}
        >
          <View>
            <Icon name={Star} color={iconColor} />
            {(isFull || isHalf) && (
              <View style={StyleSheet.absoluteFill}>
                <Icon
                  name={isHalf ? StarHalf : Star}
                  fill={GOLD}
                  color={GOLD}
                />
              </View>
            )}
          </View>
        </TouchableOpacity>
      );
    });
  };

  return (
    <AlertDialog
      isVisible={!!item}
      dismissible
      onClose={onClose}
      confirmText=""
      showCancelButton={false}
    >
      <Text
        variant="subtitle"
        style={{ textAlign: "center" }}
      >{`${originalTitle} (${new Date(releaseDate).getFullYear()})`}</Text>
      <View style={{ marginVertical: 20 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          {renderStars()}
        </View>
      </View>
      <View style={s.btnContainer}>
        <Button
          size="sm"
          variant="outline"
          style={{ flex: 1 }}
          onPress={() => {
            if (originalRating !== rating) {
              setRating(originalRating);
              return;
            }

            onClose();
          }}
          disabled={isPendingDelete}
        >
          <Icon name={StarX} color={iconColor} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          style={{ flex: 1 }}
          onPress={mutateDelete}
          loading={isPendingDelete}
          loadingVariant="circle"
          disabled={isPendingAdd}
        >
          <Icon name={StarMinus} color={removeColor} />
        </Button>
        <Button
          size="sm"
          variant="outline"
          style={{ flex: 1 }}
          onPress={mutateAdd}
          loading={isPendingAdd}
          loadingVariant="circle"
          disabled={isPendingDelete}
        >
          <Icon name={StarPlus} color={addColor} />
        </Button>
      </View>
    </AlertDialog>
  );
};

export default RatingModal;

const s = StyleSheet.create({
  btnContainer: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  ratingStarsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
});
