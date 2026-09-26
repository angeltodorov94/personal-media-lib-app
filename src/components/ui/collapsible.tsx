import { Icon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { View } from "@/components/ui/view";
import { useHaptics } from "@/hooks/useHaptics";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import { Dispatch, PropsWithChildren, SetStateAction } from "react";
import { TouchableOpacity } from "react-native";

export function Collapsible({
  children,
  title,
  haptic = true,
  isOpen,
  setIsOpen,
}: PropsWithChildren & {
  title: string;
  haptic?: boolean;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const feedback = useHaptics(haptic);

  const handlePress = () => {
    feedback(isOpen ? "toggle-off" : "toggle-on");
    setIsOpen((value) => !value);
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 6,
          paddingLeft: 10,
        }}
        onPress={handlePress}
        activeOpacity={0.8}
        accessibilityRole="button"
        accessibilityState={{ expanded: isOpen }}
      >
        <Icon name={isOpen ? ChevronDown : ChevronRight} size={18} />

        <Text variant="subtitle">{title}</Text>
      </TouchableOpacity>

      {isOpen && (
        <View
          style={{
            marginTop: 6,
            // marginLeft: 24,
          }}
        >
          {children}
        </View>
      )}
    </View>
  );
}
