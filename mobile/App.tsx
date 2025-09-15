import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import FeedScreen from './src/screens/FeedScreen';
import AccountScreen from './src/screens/AccountScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#3B82F6',
          tabBarInactiveTintColor: '#6B7280',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopColor: '#E5E7EB',
            borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
            borderBottomColor: '#E5E7EB',
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: '#111827',
          },
        }}
      >
        <Tab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon name="list" color={color} focused={focused} />
            ),
            headerTitle: 'Items Feed',
          }}
        />
        <Tab.Screen
          name="Account"
          component={AccountScreen}
          options={{
            tabBarIcon: ({ focused, color }) => (
              <TabIcon name="user" color={color} focused={focused} />
            ),
            headerTitle: 'Account',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// Simple tab icon component using text as icons for simplicity
const TabIcon: React.FC<{ name: string; color: string; focused: boolean }> = ({
  name,
  color,
  focused,
}) => {
  const iconMap: { [key: string]: string } = {
    list: '📋',
    user: '👤',
  };

  return (
    <Text style={{ 
      fontSize: focused ? 24 : 20, 
      color,
      opacity: focused ? 1 : 0.6
    }}>
      {iconMap[name] || '?'}
    </Text>
  );
}; 