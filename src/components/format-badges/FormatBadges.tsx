import { View } from "@/components/ui/view";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Image, ImageSource } from "expo-image";

type Badge = {
  key: string;
  alt: string;
  /** width / height of the artwork */
  aspectRatio: number;
  /** Artwork per theme, for logos that are a single flat colour */
  source: Record<"light" | "dark", ImageSource>;
};

const BADGE_HEIGHT = 16;

const HDR: ImageSource = require("@/assets/pics/hdr-icon.svg");
const ULTRA_HD_4K: ImageSource = require("@/assets/pics/ultra-hd-4k-icon.svg");

const BADGES: Badge[] = [
  {
    key: "ultra-hd-4k",
    alt: "Ultra HD 4K",
    aspectRatio: 122.88 / 57.15,
    source: { light: ULTRA_HD_4K, dark: ULTRA_HD_4K },
  },
  {
    key: "hdr",
    alt: "HDR",
    aspectRatio: 512 / 242.11,
    source: { light: HDR, dark: HDR },
  },
  {
    key: "hdr10plus",
    alt: "HDR10+",
    aspectRatio: 1000 / 216,
    source: {
      light: require("@/assets/pics/hdr10plus-black.png"),
      dark: require("@/assets/pics/hdr10plus-white.png"),
    },
  },
  {
    key: "dolby-vision",
    alt: "Dolby Vision",
    aspectRatio: 1051 / 393,
    source: {
      light: require("@/assets/pics/Dolby_Vision_2021_logo.svg"),
      dark: require("@/assets/pics/Dolby_Vision_2021_logo_white.svg"),
    },
  },
];

const FormatBadges = () => {
  const scheme = useColorScheme();

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      {BADGES.map(({ key, alt, aspectRatio, source }) => (
        <Image
          key={key}
          source={source[scheme]}
          alt={alt}
          contentFit="contain"
          style={{ height: BADGE_HEIGHT, width: BADGE_HEIGHT * aspectRatio }}
        />
      ))}
    </View>
  );
};

export default FormatBadges;
