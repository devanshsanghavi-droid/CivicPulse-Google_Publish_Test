# React Native Setup & Run Instructions

## Quick Start (Choose One Method)

### Method 1: Using Expo (Easiest - Recommended for Testing)

Expo is the easiest way to run React Native apps without needing Xcode or Android Studio.

1. **Install Expo CLI:**
   ```bash
   npm install -g expo-cli
   ```

2. **Create Expo project:**
   ```bash
   npx create-expo-app CivicPulseExpo
   cd CivicPulseExpo
   ```

3. **Copy our files:**
   - Copy all `.native.tsx` files to the Expo project
   - Copy `App.native.tsx` and rename to `App.tsx`
   - Copy `services/mockApi.native.ts` to `services/`
   - Copy `types.ts` and `constants.ts`

4. **Install dependencies:**
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
   npm install react-native-screens react-native-safe-area-context
   npm install @react-native-async-storage/async-storage
   npm install react-native-maps
   npm install @google/genai
   ```

5. **Run:**
   ```bash
   npx expo start
   ```
   Then scan QR code with Expo Go app on your phone, or press `i` for iOS simulator, `a` for Android emulator.

### Method 2: Full React Native CLI (For Production)

This requires Xcode (macOS) and/or Android Studio.

1. **Install React Native CLI:**
   ```bash
   npm install -g react-native-cli
   ```

2. **Create new project:**
   ```bash
   npx react-native init CivicPulseNative
   cd CivicPulseNative
   ```

3. **Copy our converted files:**
   - Copy all `.native.tsx` files to `src/screens/` or `screens/`
   - Copy `App.native.tsx` to `App.tsx`
   - Copy `services/mockApi.native.ts` to `services/`
   - Copy `types.ts` and `constants.ts`
   - Update `index.js` to import from `App.tsx`

4. **Install dependencies:**
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
   npm install react-native-screens react-native-safe-area-context
   npm install @react-native-async-storage/async-storage
   npm install react-native-maps
   npm install react-native-geolocation-service
   npm install react-native-image-picker
   ```

5. **For iOS (macOS only):**
   ```bash
   cd ios
   pod install
   cd ..
   ```

6. **Run:**
   ```bash
   # Start Metro bundler
   npm start
   
   # In another terminal:
   npm run ios      # For iOS
   npm run android  # For Android
   ```

## Current Project Structure

Your React Native files are ready:
- `App.native.tsx` - Main app
- `screens/*.native.tsx` - All screen components
- `services/mockApi.native.ts` - AsyncStorage API
- `index.native.js` - Entry point
- `package.native.json` - Dependencies list

## Troubleshooting

### If you get "Command not found" errors:
- Make sure Node.js is installed: `node --version` (should be 18+)
- Install dependencies: `npm install`

### For iOS:
- Need macOS with Xcode installed
- Run `pod install` in `ios/` directory

### For Android:
- Need Android Studio installed
- Need Android SDK configured
- Need an emulator running or device connected

### Maps not working:
- Need to configure Google Maps API keys
- See: https://github.com/react-native-maps/react-native-maps/blob/master/docs/installation.md

## Quick Test (Web Version Still Works)

The original web version is still available:
```bash
npm run dev
```
Visit http://localhost:3000
