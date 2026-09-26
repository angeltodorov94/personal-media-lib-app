import HeaderComponent from "@/components/header/header-component/HeaderComponent";
import { Stack } from "expo-router";

export default function DiscoverStackLayout() {
  return (
    <Stack
      screenOptions={{
        header: (props) => <HeaderComponent {...props} />,
        headerTransparent: true,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="person/[id]" options={{ title: "Actor" }} />
      <Stack.Screen name="tv/[id]" options={{ title: "TV Show" }} />
      <Stack.Screen name="movie/[id]" options={{ title: "Movie" }} />
    </Stack>
  );
}
