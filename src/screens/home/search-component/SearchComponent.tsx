import Loading from "@/components/common/loading/Loading";
import { BottomSheet } from "@/components/ui/bottom-sheet";
import { SearchBar } from "@/components/ui/searchbar";
import { View } from "@/components/ui/view";
import { useGetMultiSearch } from "@/hooks/api/search/useGetMultiSearch";
import { useColor } from "@/hooks/useColor";
import { useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
import SearchItem from "./search-item/SearchItem";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

const SearchComponent = ({ isVisible, onClose }: Props) => {
  const [submittedSearch, setSubmittedSearch] = useState("");
  const inputBorderColor = useColor("textMuted");

  const {
    data: searchData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading: isSearchLoading,
  } = useGetMultiSearch(submittedSearch);

  const searchResults = searchData?.pages.flatMap((p) => p.results) ?? [];

  // inside component:
  const isCloseToBottom = ({
    layoutMeasurement,
    contentOffset,
    contentSize,
  }: NativeScrollEvent) => {
    const paddingToBottom = 100;
    return (
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom
    );
  };

  const handleSheetScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isCloseToBottom(e.nativeEvent) && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const onDismiss = () => {
    setSubmittedSearch("");
    onClose();
  };

  return (
    <BottomSheet
      isVisible={isVisible}
      onClose={onDismiss}
      snapPoints={[0.6, 0.9]}
      enableBackdropDismiss
      onScroll={handleSheetScroll}
    >
      <SearchBar
        loading={isSearchLoading}
        onSearch={(query) => setSubmittedSearch(query)}
        onClear={() => setSubmittedSearch("")}
        debounceMs={300}
        placeholder="Search for anything..."
        containerStyle={{
          borderWidth: 1,
          borderColor: inputBorderColor,
          marginBottom: 10,
        }}
      />
      <View>
        {searchResults.map((item) => (
          <SearchItem
            key={`${item.media_type}-${item.id}`}
            item={item}
            onClick={onDismiss}
          />
        ))}
        {isFetchingNextPage && <Loading />}
      </View>
    </BottomSheet>
  );
};

export default SearchComponent;
