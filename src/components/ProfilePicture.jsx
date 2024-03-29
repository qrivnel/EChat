import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function ProfilePicture({ userData, width, height }) {
    return (
        <View style={[styles.imageView, { width: width, height: height, backgroundColor: userData.bgColor}]}>
            <Text style={[styles.imageText, { fontSize: width / 2 }]}>
                {userData.name.at(0).toUpperCase()}{userData.surname.at(0).toUpperCase()}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    imageView: {
        borderRadius: 9999999999,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageText: {
        color: '#e8e8e8',
        fontWeight: 'bold',
    }
})