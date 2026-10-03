import { useColor } from "@/hooks/useColor";
import { Pressable, PressableProps } from "react-native";

type Props = PressableProps & {
  /** Overrides the theme-based ripple color. */
  rippleColor?: string;
  /** Ripple extends past the view bounds (good for icon buttons). */
  borderless?: boolean;
  /** Ripple radius in dp. Only meaningful with `borderless`. */
  radius?: number;
  /** Draw the ripple above children. Needed over images, which would hide a background ripple. */
  foreground?: boolean;
};

/** Matches Android's tap timeout: a touch that turns into a scroll within this window never shows the ripple. */
const PRESS_DELAY_MS = 100;

const RipplePressable = ({
  rippleColor,
  borderless = false,
  radius,
  foreground = true,
  ...rest
}: Props) => {
  const themeRippleColor = useColor("muted");

  return (
    <Pressable
      android_ripple={{
        color: rippleColor ?? themeRippleColor,
        borderless,
        radius,
        foreground,
      }}
      unstable_pressDelay={PRESS_DELAY_MS}
      {...rest}
    />
  );
};

export default RipplePressable;
