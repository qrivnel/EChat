import { Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

//NPM

export default function Message({ messageIndex, username, text, date }) {

    return (
        <TouchableOpacity
            style={styles.mainView}
            onPress={() => {
                console.log(date, messageIndex);
            }}>
            <Text style={styles.usernameText}>{username}:</Text>
            <Text style={styles.messageText}> {text}</Text>
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
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        padding: 10
    }
})