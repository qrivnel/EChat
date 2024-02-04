import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

//SCREENS
import { ChatsScreen, SettingsScreen } from '../screens'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

export default function UserStacks({ setIsAuth }) {
    return (
        <Tab.Navigator
            initialRouteName='chats'
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen
                name="chats"
                component={ChatsScreen} />
            <Tab.Screen
                name="settings" >
                {(props) => <SettingsScreen {...props} setIsAuth={setIsAuth} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})