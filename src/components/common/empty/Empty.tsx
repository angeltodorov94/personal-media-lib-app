import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

const Empty = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>No data available</Text>
    </View>
  );
};

export default Empty;
