import { Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'

export default function Message({ messageIndex, user, text, time, bgcolor }) {
    return (
        <TouchableOpacity
            style={[styles.mainView, { backgroundColor: bgcolor }]}>
            <Text style={styles.messageText}> {text}</Text>
            <Text style={{ fontSize: 15, color: 'gray', position: 'absolute', bottom: 0, right: 5 }}>{
                `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`
            }</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    messageText: {
        color: 'black',
        fontSize: 20,
    },
    usernameText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        paddingHorizontal: Platform.OS == 'ios' ? 10 : 0,
        paddingVertical: Platform.OS == 'ios' ? 8 : 0,
    },
    mainView: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 10
    }
})