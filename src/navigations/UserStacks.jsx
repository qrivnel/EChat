import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//SCREENS
import { ChatsScreen, SettingsScreen } from '../screens'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function UserStacks() {
    return (
        <Tab.Navigator
        initialRouteName='chats'
        screenOptions={{headerShown: false}}
        >
            <Tab.Screen name="chats" component={ChatsScreen} />
            <Tab.Screen name="settings" component={SettingsScreen} />
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})