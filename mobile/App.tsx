import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import FeedScreen from './src/screens/FeedScreen';
import AccountScreen from './src/screens/AccountScreen';
import { COLORS } from './src/constants/colors';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: COLORS.redMedium,
          tabBarInactiveTintColor: COLORS.grayMedium,
          tabBarStyle: {
            backgroundColor: COLORS.white,
            borderTopColor: COLORS.grayLight,
            borderTopWidth: 1,
          },
          headerStyle: {
            backgroundColor: COLORS.white,
            borderBottomColor: COLORS.grayLight,
            borderBottomWidth: 1,
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
            color: COLORS.grayDark,
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