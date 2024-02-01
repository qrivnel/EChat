import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function SettingsScreen() {
    return (
        <SafeAreaView>
            <Text style={styles.text}>SettingsScreen</Text>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    text: {
        color: 'black'
    }
})