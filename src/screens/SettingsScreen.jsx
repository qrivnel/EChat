import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ setIsAuth, currentUser }) {
    const logout = () => {
        AsyncStorage.removeItem('currentuser')
        setIsAuth(false)
    }

    const navigateToProfile = () => {

    }
    return (
        <SafeAreaView style={styles.mainView}>
            <TouchableOpacity
            id='profile'
            style={{}}
            onPress={navigateToProfile}>
                
            </TouchableOpacity>
            <TouchableOpacity
                id='logoutbutton'
                style={[styles.logoutButton, { backgroundColor: 'red' }]}
                onPress={logout}>
                <Text style={styles.logoutButtonText}>Çıkış yap</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoutButton: {
        borderWidth: 1,
        width: 100,
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoutButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
})