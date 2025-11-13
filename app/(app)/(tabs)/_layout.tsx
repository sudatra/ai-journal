import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/misc/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import PlusButton from '@/components/app/PlusButton';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors["light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          backgroundColor: "white",
          borderTopWidth: 1,
          borderTopColor: "#e1e1e1",
          height: 90,
          paddingBottom: 20,
          paddingTop: 10,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="house.fill" 
              color={color} 
            />
          )
        }}
      />

      <Tabs.Screen
        name="entries"
        options={{
          title: 'Entries',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="paperplane.fill" 
              color={color} 
            />
          )
        }}
      />

      <Tabs.Screen
        name="journal"
        options={{
          title: '',
          tabBarIcon: () => <PlusButton />,
          tabBarButton: () => <PlusButton />
        }}
      />

      <Tabs.Screen
        name="ai-chat"
        options={{
          title: 'AI Chat',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="paperplane.fill" 
              color={color} 
            />
          )
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <IconSymbol 
              size={28} 
              name="paperplane.fill" 
              color={color} 
            />
          )
        }}
      />
    </Tabs>
  );
}
