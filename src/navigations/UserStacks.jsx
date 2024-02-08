import { FlatListComponent, StyleSheet, Text, View } from 'react-native'
import React, { useState, useEffect } from 'react'

//SCREENS
import { ChatsScreen, SettingsScreen, ProfileScreen, ChatScreen, ContactScreen } from '../screens'

import AsyncStorage from '@react-native-async-storage/async-storage';

//FIREBASE
import firestore from '@react-native-firebase/firestore'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

export default function UserStacks({ setIsAuth }) {
    const [currentUser, setCurrentUser] = useState()

    useEffect(() => {
        getCurrentUser()
    }, [])

    const getCurrentUser = () => {
        AsyncStorage.getItem('currentuser')
            .then(res => {
                firestore().collection('users').doc(res).get()
                    .then(res => setCurrentUser(res))
            })
    }

    const Home = () => (
        <Tab.Navigator
            initialRouteName='chatlist'
            screenOptions={{ headerShown: false }}>

            <Tab.Screen
                name='chatlist'>
                {(props) => <ChatsScreen {...props} currentUser={currentUser} />}
            </Tab.Screen>

            <Tab.Screen
                name="settings" >
                {(props) => <SettingsScreen {...props} setIsAuth={setIsAuth} currentUser={currentUser} />}
            </Tab.Screen>

            <Tab.Screen
                name="profile" >
                {(props) => <ProfileScreen {...props} currentUser={currentUser} />}
            </Tab.Screen>
        </Tab.Navigator>
    )
    return (
        <Stack.Navigator
            initialRouteName='home'
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name='home' component={Home} />
            <Stack.Screen name='chatdetail'>
                {(props) => <ChatScreen {...props} currentUser={currentUser} />}
            </Stack.Screen>
            <Stack.Screen name='contact' component={ContactScreen} />
        </Stack.Navigator>
        // <Tab.Navigator
        //     initialRouteName='chats'
        //     screenOptions={{ headerShown: false }}
        // >
        //     <Tab.Screen
        //         name="chats">
        //         {
        //             () => (
        //                 <Stack.Navigator
        //                 initialRouteName='chatlists'
        //                 screenOptions={{headerShown: false}}>
        //                     <Stack.Screen name='chatslist'>
        //                         {(props) => <ChatsScreen {...props} currentUser={currentUser} />}
        //                     </Stack.Screen>
        //                     <Stack.Screen name='chatdetail' component={ChatScreen} />
        //                     <Stack.Screen name='contact' component={ContactScreen} />
        //                 </Stack.Navigator>
        //             )
        //         }
        //     </Tab.Screen>

        //     <Tab.Screen
        //         name="settings" >
        //         {(props) => <SettingsScreen {...props} setIsAuth={setIsAuth} currentUser={currentUser} />}
        //     </Tab.Screen>

        //     <Tab.Screen
        //         name="profile" >
        //         {(props) => <ProfileScreen {...props} currentUser={currentUser} />}
        //     </Tab.Screen>
        // </Tab.Navigator>
    )
}

const styles = StyleSheet.create({})