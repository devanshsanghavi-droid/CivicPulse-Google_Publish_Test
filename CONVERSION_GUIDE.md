# React Native Conversion Guide

This document outlines the conversion of CivicPulse from a React web application to React Native.

## Completed Conversions

### Core Infrastructure
- ✅ **App.native.tsx** - Main app with React Navigation (Stack + Tab navigators)
- ✅ **mockApi.native.ts** - AsyncStorage-based storage (replaces localStorage)
- ✅ **package.native.json** - React Native dependencies

### Screen Components
- ✅ **LandingScreen.native.tsx** - Landing page with features and stats
- ✅ **FeedScreen.native.tsx** - Issue feed with search and filters
- ✅ **MapScreen.native.tsx** - Map view using react-native-maps
- ✅ **LoginScreen.native.tsx** - Login form
- ✅ **LocationExplanationScreen.native.tsx** - Location permission explanation
- ✅ **ReportScreen.native.tsx** - Issue reporting form
- ✅ **ProfileScreen.native.tsx** - User profile and stats
- ✅ **IssueDetailScreen.native.tsx** - Issue details with comments
- ✅ **AdminDashboardScreen.native.tsx** - Admin issue management

## Key Changes

### 1. Navigation
- **Before**: State-based routing with `currentScreen` state
- **After**: React Navigation with Stack and Tab navigators
- Navigation now uses `navigation.navigate()` instead of `setScreen()`

### 2. Storage
- **Before**: `localStorage` (synchronous)
- **After**: `AsyncStorage` (asynchronous)
- All `mockApi` methods are now async and return Promises

### 3. Components
- **Before**: HTML elements (`div`, `button`, `input`, `img`)
- **After**: React Native components (`View`, `TouchableOpacity`, `TextInput`, `Image`)

### 4. Styling
- **Before**: Tailwind CSS classes
- **After**: StyleSheet API with JavaScript objects
- Colors, spacing, and typography converted to StyleSheet format

### 5. Maps
- **Before**: Leaflet.js (web library)
- **After**: react-native-maps (native maps)
- Requires platform-specific setup (iOS/Android)

### 6. Images
- **Before**: HTML `<img>` tags
- **After**: React Native `Image` component
- Photo selection uses `react-native-image-picker`

## Setup Instructions

1. **Rename package file:**
   ```bash
   mv package.native.json package.json
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **iOS Setup (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Start Metro bundler:**
   ```bash
   npm start
   ```

5. **Run on device/simulator:**
   ```bash
   # iOS
   npm run ios
   
   # Android
   npm run android
   ```

## Remaining Work

### High Priority
1. **Icons**: Replace placeholder icons with `react-native-vector-icons` or similar
2. **Image Picker**: Implement photo selection in ReportScreen
3. **Location Services**: Get actual GPS coordinates in ReportScreen
4. **Error Handling**: Add comprehensive error boundaries and user feedback
5. **Loading States**: Improve loading indicators across all screens

### Medium Priority
1. **Animations**: Add React Native Animated API for transitions
2. **Push Notifications**: Implement notification system
3. **Offline Support**: Add offline data caching
4. **Deep Linking**: Configure deep links for issue details
5. **Biometric Auth**: Add fingerprint/face ID login

### Low Priority
1. **Theming**: Implement dark mode support
2. **Accessibility**: Add accessibility labels and hints
3. **Performance**: Optimize FlatList rendering for large datasets
4. **Testing**: Add unit and integration tests

## File Structure

```
.
├── App.native.tsx              # Main app with navigation
├── index.native.js              # React Native entry point
├── app.json                     # App configuration
├── package.native.json          # Dependencies (rename to package.json)
├── screens/
│   ├── *.native.tsx            # All converted screens
├── services/
│   ├── mockApi.native.ts       # AsyncStorage-based API
│   └── geminiService.ts       # (No changes needed)
└── types.ts                     # (No changes needed)
```

## Important Notes

1. **Async Operations**: All storage operations are now async. Make sure to use `await` or `.then()` when calling `mockApi` methods.

2. **Navigation Types**: The navigation prop is typed as `any` for simplicity. Consider creating proper TypeScript types for navigation.

3. **Platform Differences**: Some features may need platform-specific code (iOS vs Android). Use `Platform.OS` to check.

4. **Permissions**: Location and camera permissions need to be configured in:
   - iOS: `ios/Info.plist`
   - Android: `android/app/src/main/AndroidManifest.xml`

5. **Maps Configuration**: 
   - iOS: Requires Google Maps API key in `ios/AppDelegate.m`
   - Android: Requires API key in `android/app/src/main/AndroidManifest.xml`

## Testing Checklist

- [ ] App launches without errors
- [ ] Navigation between screens works
- [ ] Login/logout functionality
- [ ] Issue creation with location
- [ ] Map displays issues correctly
- [ ] Comments and upvotes work
- [ ] Admin dashboard functions
- [ ] AsyncStorage persists data
- [ ] Location permissions work
- [ ] Image picker works (when implemented)

## Next Steps

1. Set up a new React Native project using `npx react-native init`
2. Copy the converted files into the new project
3. Install all dependencies
4. Configure platform-specific settings (maps, permissions)
5. Test on both iOS and Android devices/simulators
6. Implement remaining features from the "Remaining Work" section
