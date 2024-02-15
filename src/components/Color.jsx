import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

export default function Color({ bgColor, onPress }) {
    return (
        <TouchableOpacity
            onPress={onPress}>
            <View style={[styles.mainView, { backgroundColor: bgColor }]} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    mainView: {
        width: 50,
        height: 50,
        borderRadius: 100,
        margin: 10
    }
})