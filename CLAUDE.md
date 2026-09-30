@AGENTS.md

# Project Overview

This is a mobile application built with **Expo (React Native)** and **TypeScript**. Its about managing my personal media library. It uses
TMDB for external api and source for now.

## Tech Stack

- **Framework:** Expo (SDK 57+) / React Native
- **Routing:** Expo Router (File-based routing under `/app`)
- **Language:** TypeScript
- **Styling:** BNA UI / React Native StyleSheet
- **State Management:** Zustand / TanStack Query (React Query)
- **API Client:** Axios

---

## Common Commands

### Development

- `npx expo start` - Start local dev server / Metro bundler
- `npx expo start --clear` - Clear Metro bundler cache
- `npx expo run:ios` - Run native iOS build locally
- `npx expo run:android` - Run native Android build locally

### Quality & Testing

- `npm run lint` - Run ESLint checks
- `npm run type-check` - Run `tsc --noEmit` to verify Typescript types
- `npm run test` - Run Jest unit tests

### EAS & Deployments

- `npx eas-cli build --profile development --platform all` - Trigger dev build
- `npx eas-cli update --branch preview` - Push an OTA update

---

## Code Architecture & Folder Structure

- `/app` - Expo Router pages, layouts, and routes
  - `(tabs)` - Tab navigation group
  - `_layout.tsx` - Root and nested layout providers
- `/components` - Reusable UI components.
- `/hooks` - Custom React hooks (`use...`)
- `/hooks/api` - API calls
- `/store` - Global state management (Zustand)
- `/types` - TypeScript interfaces and global type definitions
- `/lib` - Utility functions and helpers
- `/screens` - Screens put as components and just imported into the router

---

## Code Style & Conventions

### React & Expo Best Practices

- **Functional Components:** Always use functional components with standard `export default` or named exports.
- **Expo Router:** Use `useRouter()` and `<Link />` from `expo-router` for navigation. Do not use legacy `@react-navigation/native` navigation props.
- **Cross-Platform:** Design only for Android.
- **Components:** Use components from src/components/ui before using the react-native alternative.
- **Assets & Images:** Import local images using Expo's standard `Image` or `expo-image` components.
- Don't react src/components/ui and src/components/charts unless specifically told to, they are external components.

### TypeScript Rules

- Avoid `any` at all costs. Explicitly define interface props or use strict generics.
- Define prop types using `type Props = { ... }` directly above the component.
- Keep state and types co-located or under `/types`.
- Use custom hooks as often as possible and reasonable.

### Performance Rules

- Wrap list items in `<FlatList>` or `<FlashList>`—never map arrays inside a `<ScrollView>`.
- Use `useCallback` for functions passed as props to heavy list items.
