import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function Chat() {
  return (
    <View>
      <Text style={styles.chat}>Chat</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  chat: {
    color: 'black',
  }
})