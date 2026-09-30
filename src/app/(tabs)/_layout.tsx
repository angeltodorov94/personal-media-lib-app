import { useGetCountries } from "@/hooks/api/country/useGetCountries";
import { useGetGenres } from "@/hooks/api/genre/useGetGenres";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  useGetCountries();
  useGetGenres("movie");
  useGetGenres("tv");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="discover"
        options={{
          title: "Discover",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "binoculars-sharp" : "binoculars-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ratings"
        options={{
          title: "My Ratings",
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "star" : "star-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
