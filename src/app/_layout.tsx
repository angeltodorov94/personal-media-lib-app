import { ToastProvider } from "@/components/ui/toast";
import { useColorScheme } from "@/hooks/useColorScheme";
import { queryClient } from "@/lib/queryClient";
import { ThemeProvider } from "@/providers/theme-provider";
import { QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <ToastProvider maxToasts={3}>
          <QueryClientProvider client={queryClient}>
            <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            </Stack>
          </QueryClientProvider>
        </ToastProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
