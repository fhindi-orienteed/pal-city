import { Tabs } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const inactiveTintColor = '#999';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#E25822',
        tabBarInactiveTintColor: inactiveTintColor,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0.5,
          paddingBottom: 8,
          paddingTop: 4,
          height: 60,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: focused ? '#FFE8E0' : 'transparent',
                paddingHorizontal: focused ? 8 : 0,
                paddingVertical: focused ? 4 : 0,
                borderRadius: 20,
                minWidth: focused ? 80 : 60,
              }}
            >
              <IconSymbol size={20} name="house.fill" color={color} />
              {focused && (
                <Text style={{ color: '#E25822', fontSize: 14, fontWeight: '500' }}>
                  Home
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: focused ? '#FFE8E0' : 'transparent',
                paddingHorizontal: focused ? 8 : 0,
                paddingVertical: focused ? 4 : 0,
                borderRadius: 20,
                minWidth: focused ? 85 : 60,
              }}
            >
              <IconSymbol size={20} name="magnifyingglass" color={color} />
              {focused && (
                <Text style={{ color: '#E25822', fontSize: 14, fontWeight: '500' }}>
                  Search
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: focused ? '#FFE8E0' : 'transparent',
                paddingHorizontal: focused ? 8 : 0,
                paddingVertical: focused ? 4 : 0,
                borderRadius: 20,
                minWidth: focused ? 90 : 60,
              }}
            >
              <IconSymbol size={20} name="paperplane.fill" color={color} />
              {focused && (
                <Text style={{ color: '#E25822', fontSize: 14, fontWeight: '500' }}>
                  Explore
                </Text>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          title: 'More',
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                backgroundColor: focused ? '#FFE8E0' : 'transparent',
                paddingHorizontal: focused ? 8 : 0,
                paddingVertical: focused ? 4 : 0,
                borderRadius: 20,
                minWidth: focused ? 75 : 60,
              }}
            >
              <IconSymbol size={20} name="ellipsis" color={color} />
              {focused && (
                <Text style={{ color: '#E25822', fontSize: 14, fontWeight: '500' }}>
                  More
                </Text>
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
