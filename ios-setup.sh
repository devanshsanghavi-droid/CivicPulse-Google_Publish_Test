#!/bin/bash

echo "🍎 Setting up iOS configuration for CivicPulse"
echo "=============================================="
echo ""

# Check if we're in a React Native project
if [ ! -d "ios" ]; then
    echo "❌ Error: 'ios' directory not found."
    echo "Please run this script from a React Native project root directory."
    echo ""
    echo "To create a React Native project:"
    echo "  npx react-native init CivicPulseNative"
    exit 1
fi

echo "✅ iOS directory found"
echo ""

# Create Info.plist backup if it exists
if [ -f "ios/CivicPulseNative/Info.plist" ]; then
    echo "📝 Found Info.plist"
    
    # Add location permissions
    echo "Adding location permissions..."
    /usr/libexec/PlistBuddy -c "Add NSLocationWhenInUseUsageDescription string 'CivicPulse needs your location to show nearby issues and help you report problems in your area.'" ios/CivicPulseNative/Info.plist 2>/dev/null || \
    /usr/libexec/PlistBuddy -c "Set NSLocationWhenInUseUsageDescription 'CivicPulse needs your location to show nearby issues and help you report problems in your area.'" ios/CivicPulseNative/Info.plist
    
    /usr/libexec/PlistBuddy -c "Add NSLocationAlwaysUsageDescription string 'CivicPulse needs your location to show nearby issues and help you report problems in your area.'" ios/CivicPulseNative/Info.plist 2>/dev/null || \
    /usr/libexec/PlistBuddy -c "Set NSLocationAlwaysUsageDescription 'CivicPulse needs your location to show nearby issues and help you report problems in your area.'" ios/CivicPulseNative/Info.plist
    
    # Add camera permissions for photo uploads
    echo "Adding camera permissions..."
    /usr/libexec/PlistBuddy -c "Add NSCameraUsageDescription string 'CivicPulse needs camera access to let you take photos of issues you want to report.'" ios/CivicPulseNative/Info.plist 2>/dev/null || \
    /usr/libexec/PlistBuddy -c "Set NSCameraUsageDescription 'CivicPulse needs camera access to let you take photos of issues you want to report.'" ios/CivicPulseNative/Info.plist
    
    /usr/libexec/PlistBuddy -c "Add NSPhotoLibraryUsageDescription string 'CivicPulse needs photo library access to let you select photos of issues you want to report.'" ios/CivicPulseNative/Info.plist 2>/dev/null || \
    /usr/libexec/PlistBuddy -c "Set NSPhotoLibraryUsageDescription 'CivicPulse needs photo library access to let you select photos of issues you want to report.'" ios/CivicPulseNative/Info.plist
    
    echo "✅ Permissions added to Info.plist"
else
    echo "⚠️  Info.plist not found at expected location"
    echo "You may need to add permissions manually:"
    echo ""
    echo "Add to Info.plist:"
    echo "  - NSLocationWhenInUseUsageDescription"
    echo "  - NSLocationAlwaysUsageDescription"
    echo "  - NSCameraUsageDescription"
    echo "  - NSPhotoLibraryUsageDescription"
fi

echo ""
echo "📦 Installing CocoaPods dependencies..."
cd ios
if command -v pod &> /dev/null; then
    pod install
else
    echo "⚠️  CocoaPods not found. Installing..."
    sudo gem install cocoapods
    pod install
fi
cd ..

echo ""
echo "✅ iOS setup complete!"
echo ""
echo "Next steps:"
echo "1. Open ios/CivicPulseNative.xcworkspace in Xcode"
echo "2. Configure your development team in Xcode"
echo "3. Run: npm run ios"
echo ""
