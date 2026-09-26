import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";

type Props = {
  overview: string | null;
};

const OverviewSection = ({ overview }: Props) => {
  if (!overview) return null;

  return (
    <View style={{ paddingHorizontal: 10, gap: 10 }}>
      <Text variant="subtitle">Overview</Text>
      <Text style={{ fontSize: 16 }}>{overview}</Text>
    </View>
  );
};

export default OverviewSection;
