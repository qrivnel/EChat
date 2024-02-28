import { StyleSheet, AppState } from 'react-native'
import React, { useState, useEffect } from 'react'

//SCREENS
import { ChatsScreen, SettingsScreen, ProfileScreen, ChatScreen, ContactScreen } from '../screens'
//NPMS
import AsyncStorage from '@react-native-async-storage/async-storage';
//FIREBASE
import firestore from '@react-native-firebase/firestore'
//ASSETS
import ChatsIcon from '../assets/ChatsIcon.svg'
import SettingsIcon from '../assets/SettingsIcon.svg'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

export default function UserStacks({ setIsAuth }) {
    const [currentUser, setCurrentUser] = useState()
    const [appState, setAppState] = useState(AppState.currentState);

    useEffect(() => {
        getCurrentUser()
        setCurrentUserStatus()
        const handleAppStateChange = (nextAppState) => {
            setAppState(nextAppState)
        };
        AppState.addEventListener('change', handleAppStateChange);
    }, [])

    useEffect(() => {
        try {
            if (currentUser != undefined)
                firestore().collection('users').doc(currentUser.id)
                    .update({
                        status: appState,
                        lastActivity: new Date(),
                    })
        } catch (error) {
            console.log(error);
        }
    }, [appState])


    const setCurrentUserStatus = () => {
        try {
            AsyncStorage.getItem('currentuser')
                .then(res => {
                    firestore().collection('users').doc(res)
                        .update({
                            status: appState
                        })
                })
        } catch (error) {
            console.log(error);
        }
    }
    const getCurrentUser = () => {
        try {
            AsyncStorage.getItem('currentuser')
                .then(res => {
                    firestore().collection('users').doc(res)
                        .onSnapshot(res => setCurrentUser(res))
                })
        } catch (error) {
            console.log(error);
        }
    }

    const Home = () => (
        <Tab.Navigator
            initialRouteName='chatlist'
            screenOptions={{ headerShown: false }}>
            <Tab.Screen
                name='chatlist'
                options={{
                    title: 'Sohbetler',
                    tabBarIcon: ({ color, size }) => <ChatsIcon width={size} height={size} fill={color} />
                }}>
                {(props) => <ChatsScreen {...props} currentUser={currentUser} />}
            </Tab.Screen>

            <Tab.Screen
                name="settings"
                options={{
                    title: 'Ayarlar',
                    tabBarIcon: ({ color, size }) => <SettingsIcon width={size} height={size} fill={color} />
                }}>
                {(props) => <SettingsScreen {...props} setIsAuth={setIsAuth} currentUser={currentUser} />}
            </Tab.Screen>
        </Tab.Navigator>
    )

    return (
        <Stack.Navigator
            initialRouteName='home'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen
                name='home'
                component={Home} />
            <Stack.Screen
                name="profile" >
                {(props) => <ProfileScreen {...props} currentUser={currentUser} />}
            </Stack.Screen>
            <Stack.Screen name='chatdetail'>
                {(props) => <ChatScreen {...props} currentUser={currentUser} />}
            </Stack.Screen>
            <Stack.Screen name='contact' component={ContactScreen} />
        </Stack.Navigator>
    )
}

const styles = StyleSheet.create({})