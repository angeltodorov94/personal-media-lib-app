import { Linking } from "react-native";

export const openImdbTitle = async (imdbId: string) => {
  // Deep link formats:
  // Title (Movies/TV): imdb:///title/tt0111161/
  // Person (Actors/Directors): imdb:///name/nm0000151/
  const appUrl = `imdb:///title/${imdbId}/`;
  const webUrl = `https://www.imdb.com/title/${imdbId}/`;

  try {
    const canOpen = await Linking.canOpenURL(appUrl);
    if (canOpen) {
      await Linking.openURL(appUrl);
    } else {
      await Linking.openURL(webUrl);
    }
  } catch (error) {
    // Fallback if deep link check fails
    await Linking.openURL(webUrl);
  }
};
