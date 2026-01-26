# How to Run CivicPulse

## Option 1: Run Web Version (Currently Available) ✅

The original web version is ready to run:

```bash
# Make sure you're in the project directory
cd "/Users/devansh/Downloads/CivicPulse-Google-main 2"

# Install dependencies (if not already done)
npm install

# Start the dev server
npm run dev
```

Then open http://localhost:3000 in your browser.

---

## Option 2: Run React Native Version (Requires Setup)

The React Native version is **converted and ready**, but needs a React Native project structure to run.

### Quickest Way: Use Expo (Recommended)

1. **Run the setup script:**
   ```bash
   ./quick-start-rn.sh
   ```
   Choose option 1 (Expo)

2. **Or manually:**
   ```bash
   # Create Expo project
   npx create-expo-app@latest CivicPulseExpo --template blank-typescript
   cd CivicPulseExpo
   
   # Install navigation dependencies
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
   npm install react-native-screens react-native-safe-area-context
   npm install @react-native-async-storage/async-storage
   
   # Copy your files (from parent directory)
   cp ../App.native.tsx App.tsx
   cp -r ../screens/*.native.tsx ./screens/
   cp -r ../services/mockApi.native.ts ./services/
   cp ../types.ts .
   cp ../constants.ts .
   
   # Update App.tsx imports to remove .native
   # Update screen imports in App.tsx
   
   # Run
   npx expo start
   ```

### Full React Native CLI (For Production)

Requires Xcode (macOS) and/or Android Studio.

```bash
# Create project
npx react-native@latest init CivicPulseNative
cd CivicPulseNative

# Install dependencies
npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
npm install react-native-screens react-native-safe-area-context
npm install @react-native-async-storage/async-storage
npm install react-native-maps react-native-geolocation-service react-native-image-picker

# Copy files (same as Expo above)

# For iOS
cd ios && pod install && cd ..

# Run
npm run ios    # or npm run android
```

---

## Current Status

✅ **Web Version**: Ready to run (`npm run dev`)
✅ **React Native Code**: All files converted and ready
⏳ **React Native Project**: Needs to be set up (see above)

---

## What's Ready

All React Native files are converted:
- ✅ App.native.tsx
- ✅ All 9 screen components (.native.tsx)
- ✅ mockApi.native.ts (AsyncStorage)
- ✅ Navigation setup
- ✅ All styling converted to StyleSheet

You just need to create a React Native project and copy the files in!

---

## Need Help?

- See `SETUP_RN.md` for detailed setup instructions
- See `CONVERSION_GUIDE.md` for conversion details
- See `README.native.md` for React Native specific docs
