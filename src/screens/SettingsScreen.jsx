import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SettingsScreen({ setIsAuth }) {
    const logout = () => {
        AsyncStorage.removeItem('currentuser')
        setIsAuth(false)
    }
    const test = () => {
        AsyncStorage.getItem('currentuser').then(res=>console.log(res))
    }
    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={logout}>
                <Text>Çıkış yap</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={test}>
                <Text>test</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({

})