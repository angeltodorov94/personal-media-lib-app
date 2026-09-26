import { Spinner } from "@/components/ui/spinner";
import { View } from "@/components/ui/view";

type Props = {
  label?: string;
  flex?: 1 | 0;
};

const Loading = ({ label, flex = 1 }: Props) => {
  return (
    <View style={{ flex, justifyContent: "center", alignItems: "center" }}>
      <Spinner variant="circle" size="lg" label={label} speed="normal" />
    </View>
  );
};

export default Loading;
