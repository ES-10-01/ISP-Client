import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import AccessSettingsScreen from '../screens/AccessSettingsScreen';
import LockListScreen from '../screens/LockListScreen';
import SettingsScreen from '../screens/SettingsScreen';

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigatorAdmin() {
    const colorScheme = useColorScheme();

    return (
        <BottomTab.Navigator
            initialRouteName="LockList"
            tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
            <BottomTab.Screen
                name="Список замков"
                component={TabLockListNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Настройки доступа"
                component={TabAccessSettingsNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
                }}
            />
            <BottomTab.Screen
                name="Настройки"
                component={TabSettingsNavigator}
                options={{
                    tabBarIcon: ({ color }) => <TabBarIcon name="ios-code" color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
}

function TabBarIcon(props: { name: string; color: string }) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TabLockListStack = createStackNavigator();
function TabLockListNavigator() {
    return (
        <TabLockListStack.Navigator>
            <TabLockListStack.Screen
                name="TabLockList"
                component={LockListScreen}
                options={{ headerTitle: 'Список замков' }}
            />
        </TabLockListStack.Navigator>
    );
}

const TabAccessSettingsStack = createStackNavigator();
function TabAccessSettingsNavigator() {
    return (
        <TabAccessSettingsStack.Navigator>
            <TabAccessSettingsStack.Screen
                name="TabAccessSettings"
                component={AccessSettingsScreen}
                options={{ headerTitle: 'Настройки доступа' }}
            />
        </TabAccessSettingsStack.Navigator>
    );
}

const TabSettingsStack = createStackNavigator();
function TabSettingsNavigator() {
    return (
        <TabSettingsStack.Navigator>
            <TabSettingsStack.Screen
                name="TabSettings"
                component={SettingsScreen}
                options={{ headerTitle: 'Настройки' }}
            />
        </TabSettingsStack.Navigator>
    );
}
