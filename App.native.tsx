import React, { useState, useEffect, createContext, useContext } from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { User, Notification } from './types';
import { mockApi } from './services/mockApi.native';
import LandingScreen from './screens/LandingScreen.native';
import FeedScreen from './screens/FeedScreen.native';
import MapScreen from './screens/MapScreen.native';
import ReportScreen from './screens/ReportScreen.native';
import ProfileScreen from './screens/ProfileScreen.native';
import IssueDetailScreen from './screens/IssueDetailScreen.native';
import AdminDashboardScreen from './screens/AdminDashboardScreen.native';
import LoginScreen from './screens/LoginScreen.native';
import LocationExplanationScreen from './screens/LocationExplanationScreen.native';

export type RootStackParamList = {
  Landing: undefined;
  Login: undefined;
  LocationExplanation: { pendingScreen?: string };
  MainTabs: undefined;
  IssueDetail: { id: string };
  Admin: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

interface AppContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  isAdmin: boolean;
  notifs: Notification[];
  refreshNotifs: () => void;
  selectedIssueId: string | null;
  setSelectedIssueId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

function MainTabs() {
  const { user, isAdmin } = useApp();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
        tabBarInactiveTintColor: '#6b7280',
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
      }}
    >
      <Tab.Screen 
        name="Feed" 
        component={FeedScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen 
        name="Map" 
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="map" color={color} size={size} />
          ),
        }}
      />
      {user && (
        <Tab.Screen 
          name="Report" 
          component={ReportScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="plus" color={color} size={size} />
            ),
          }}
        />
      )}
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <TabIcon name="user" color={color} size={size} />
          ),
        }}
      />
      {isAdmin && (
        <Tab.Screen 
          name="Admin" 
          component={AdminDashboardScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <TabIcon name="shield" color={color} size={size} />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
}

function TabIcon({ name, color, size }: { name: string; color: string; size: number }) {
  // Simple emoji-based icons for iOS compatibility
  const icons: { [key: string]: string } = {
    list: '📋',
    map: '🗺️',
    plus: '➕',
    user: '👤',
    shield: '🛡️',
  };
  
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text style={{ fontSize: size, color }}>{icons[name] || '•'}</Text>
    </View>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [locationExplained, setLocationExplained] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);

  const isAdmin = user?.role === 'admin' || user?.role === 'super_admin';

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const currentUser = await mockApi.getCurrentUser();
    setUser(currentUser);
    if (currentUser) {
      refreshNotifs();
    }
  };

  const refreshNotifs = async () => {
    if (user) {
      const notifications = await mockApi.getNotifications(user.id);
      setNotifs(notifications);
    }
  };

  useEffect(() => {
    if (user) {
      refreshNotifs();
      const interval = setInterval(refreshNotifs, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  return (
    <AppContext.Provider value={{ 
      user, 
      setUser, 
      isAdmin,
      notifs, 
      refreshNotifs,
      selectedIssueId,
      setSelectedIssueId
    }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Landing" component={LandingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="LocationExplanation" component={LocationExplanationScreen} />
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen 
            name="IssueDetail" 
            component={IssueDetailScreen}
            options={{ headerShown: true, title: 'Issue Details' }}
          />
          {isAdmin && (
            <Stack.Screen 
              name="Admin" 
              component={AdminDashboardScreen}
              options={{ headerShown: true, title: 'Admin Dashboard' }}
            />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}
