import { Platform, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

//SVGS
import DoubleTickIcon from '../assets/DoubleTickIcon.svg'

export default function Message({ messageStatus, user, currentUser, text, time, position }) {
    const prepareTime = () => {
        return `${time.getHours() < 10 ? '0' + time.getHours() : time.getHours()}:${time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes()}`
    }
    return (
        <TouchableOpacity
            style={[styles.mainView, { backgroundColor: position == 'right' ? 'lightgreen' : 'lightgray', alignSelf: position == 'right' ? 'flex-end' : 'flex-start' }]}>
            <Text style={styles.messageText}> {text}</Text>
            <View
                id='bottomview'
                style={styles.bottomContainer}>
                <Text style={styles.timeText}>{
                    prepareTime()
                }</Text>
                {
                    currentUser.id == user.id
                        ? <DoubleTickIcon width={17} height={17} fill={messageStatus == 'delivered' ? 'gray' : 'blue'} />
                        : null
                }
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    bottomContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-end',
        alignItems: 'flex-end',
    },
    timeText: {
        fontSize: 12.5,
        color: 'gray',
        marginRight: 3,
    },
    messageText: {
        color: 'black',
        fontSize: 20,
    },
    mainView: {
        minWidth: 100,
        maxWidth: 250,
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        paddingVertical: 10
    }
})