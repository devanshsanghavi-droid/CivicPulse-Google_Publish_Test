# iOS Setup Guide for CivicPulse

This guide will help you configure CivicPulse to run on iOS.

## Prerequisites

1. **macOS** (required for iOS development)
2. **Xcode** (latest version from App Store)
3. **CocoaPods** - Install with: `sudo gem install cocoapods`
4. **Node.js** (v18 or higher)

## Quick Setup

1. **Create React Native project:**
   ```bash
   npx react-native init CivicPulseNative
   cd CivicPulseNative
   ```

2. **Copy your files:**
   - Copy all `.native.tsx` files to the project
   - Copy `App.native.tsx` → `App.tsx`
   - Copy `services/mockApi.native.ts` → `services/mockApi.ts`
   - Copy `types.ts` and `constants.ts`

3. **Install dependencies:**
   ```bash
   npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs
   npm install react-native-screens react-native-safe-area-context
   npm install @react-native-async-storage/async-storage
   npm install react-native-maps react-native-geolocation-service react-native-image-picker
   ```

4. **Run iOS setup script:**
   ```bash
   ./ios-setup.sh
   ```

5. **Or manually configure:**

   **a. Add permissions to `ios/CivicPulseNative/Info.plist`:**
   ```xml
   <key>NSLocationWhenInUseUsageDescription</key>
   <string>CivicPulse needs your location to show nearby issues and help you report problems in your area.</string>
   <key>NSLocationAlwaysUsageDescription</key>
   <string>CivicPulse needs your location to show nearby issues and help you report problems in your area.</string>
   <key>NSCameraUsageDescription</key>
   <string>CivicPulse needs camera access to let you take photos of issues you want to report.</string>
   <key>NSPhotoLibraryUsageDescription</key>
   <string>CivicPulse needs photo library access to let you select photos of issues you want to report.</string>
   ```

   **b. Configure Google Maps (if using):**
   
   Edit `ios/CivicPulseNative/AppDelegate.m`:
   ```objc
   #import <GoogleMaps/GoogleMaps.h>
   
   - (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
   {
     [GMSServices provideAPIKey:@"YOUR_GOOGLE_MAPS_API_KEY"];
     // ... rest of code
   }
   ```

   **c. Update Podfile:**
   
   Add to `ios/Podfile`:
   ```ruby
   pod 'react-native-maps', :path => '../node_modules/react-native-maps'
   pod 'GoogleMaps'
   pod 'Google-Maps-iOS-Utils'
   ```

   **d. Install pods:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

6. **Run the app:**
   ```bash
   npm run ios
   ```

## Troubleshooting

### "Command PhaseScriptExecution failed"
- Clean build folder in Xcode: Product → Clean Build Folder (Shift+Cmd+K)
- Delete `ios/Pods` and `ios/Podfile.lock`
- Run `pod install` again

### Maps not showing
- Make sure Google Maps API key is configured
- Check that `react-native-maps` is properly linked
- Verify Info.plist has location permissions

### Build errors
- Make sure you're opening `.xcworkspace` not `.xcodeproj`
- Check that all dependencies are installed: `npm install`
- Verify CocoaPods are installed: `pod --version`

### Simulator issues
- Reset simulator: Device → Erase All Content and Settings
- Or create a new simulator in Xcode

## Testing on Physical Device

1. Connect your iPhone via USB
2. Open Xcode
3. Select your device from the device dropdown
4. You may need to:
   - Sign in with your Apple ID in Xcode
   - Trust the developer certificate on your iPhone
   - Configure code signing in Xcode project settings

## Production Build

For App Store submission:
1. Configure code signing in Xcode
2. Set up App Store Connect
3. Archive the build: Product → Archive
4. Upload to App Store Connect

## Notes

- All HTML tags (`<div>`, `<span>`, `<p>`, etc.) have been converted to React Native components (`<View>`, `<Text>`)
- The app uses StyleSheet instead of CSS classes
- Navigation uses React Navigation (not web routing)
- Storage uses AsyncStorage (not localStorage)
