import React from 'react';
import { Tabs } from 'expo-router';
import Icon from 'react-native-ico-material-design';
import { View, Text } from 'react-native';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View className="items-center justify-center gap-2">
            <Icon
                name={icon}
                color={color}
            />
            <Text className={`text-xs ${focused ? 'font-semibold' : 'font-pregular'}`} style={{ color: color }}>
                {name}
            </Text>
        </View>
    );
}

export default function Layout() {
    return (
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#FFA001',
                tabBarInactiveTintColor: '#CDCDE0',
                tabBarStyle: {
                    backgroundColor: '#161622',
                    borderTopWidth: 1,
                    borderTopColor: '#232533',
                    height: 84,
                },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    headerShown: true,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="front-store"
                            color={color}
                            focused={focused}
                            name="Home"
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="addplant"
                options={{
                    title: 'Add Plant',
                    headerShown: true,
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="add-plus-button"
                            color={color}
                            focused={focused}
                            name="Add Plant"
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
