#!/bin/bash

echo "🚀 CivicPulse React Native Quick Start"
echo "======================================"
echo ""

# Check if we should use Expo or React Native CLI
echo "Choose setup method:"
echo "1) Expo (Easiest - Recommended)"
echo "2) React Native CLI (Full native setup)"
read -p "Enter choice (1 or 2): " choice

if [ "$choice" == "1" ]; then
    echo ""
    echo "📦 Setting up with Expo..."
    
    # Check if Expo is installed
    if ! command -v expo &> /dev/null; then
        echo "Installing Expo CLI..."
        npm install -g expo-cli
    fi
    
    echo "Creating Expo project..."
    npx create-expo-app@latest CivicPulseExpo --template blank-typescript
    
    echo ""
    echo "✅ Expo project created!"
    echo ""
    echo "Next steps:"
    echo "1. cd CivicPulseExpo"
    echo "2. Copy your .native.tsx files to the project"
    echo "3. Install dependencies: npm install @react-navigation/native @react-navigation/native-stack @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context @react-native-async-storage/async-storage"
    echo "4. Run: npx expo start"
    
elif [ "$choice" == "2" ]; then
    echo ""
    echo "📦 Setting up with React Native CLI..."
    
    # Check if React Native CLI is available
    echo "Creating React Native project..."
    npx react-native@latest init CivicPulseNative --skip-install
    
    echo ""
    echo "✅ React Native project created!"
    echo ""
    echo "Next steps:"
    echo "1. cd CivicPulseNative"
    echo "2. npm install"
    echo "3. Copy your .native.tsx files to the project"
    echo "4. Install additional dependencies (see SETUP_RN.md)"
    echo "5. For iOS: cd ios && pod install && cd .."
    echo "6. Run: npm run ios (or npm run android)"
    
else
    echo "Invalid choice. Please run the script again."
    exit 1
fi

echo ""
echo "📚 See SETUP_RN.md for detailed instructions"
