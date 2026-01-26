# CivicPulse React Native

This is the React Native version of the CivicPulse application.

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- React Native CLI
- For iOS: Xcode and CocoaPods
- For Android: Android Studio and Android SDK

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

2. **For iOS (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

3. **Start Metro bundler:**
   ```bash
   npm start
   # or
   yarn start
   ```

4. **Run on iOS:**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

5. **Run on Android:**
   ```bash
   npm run android
   # or
   yarn android
   ```

## Project Structure

- `App.native.tsx` - Main app component with React Navigation setup
- `screens/*.native.tsx` - React Native screen components
- `services/mockApi.native.ts` - API service using AsyncStorage
- `package.native.json` - React Native dependencies (rename to package.json)

## Key Changes from Web Version

1. **Navigation**: Uses React Navigation instead of state-based routing
2. **Storage**: Uses AsyncStorage instead of localStorage
3. **Components**: All web components (div, button) replaced with React Native components (View, TouchableOpacity)
4. **Styling**: Tailwind CSS replaced with StyleSheet
5. **Maps**: Uses react-native-maps instead of Leaflet
6. **Images**: Uses react-native-image-picker for photo selection

## Remaining Work

The following screens still need to be converted:
- MapScreen.native.tsx (needs react-native-maps implementation)
- ReportScreen.native.tsx
- ProfileScreen.native.tsx
- IssueDetailScreen.native.tsx
- AdminDashboardScreen.native.tsx
- LoginScreen.native.tsx
- LocationExplanationScreen.native.tsx

## Environment Variables

Create a `.env` file in the root directory:
```
GEMINI_API_KEY=your_api_key_here
```

## Notes

- The mockApi service is now async (uses AsyncStorage)
- All navigation uses React Navigation hooks
- Components use StyleSheet instead of Tailwind classes
- Icons need to be implemented (consider using react-native-vector-icons)
