import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'

export default function Chat({ user }) {
  return (
    <View style={styles.mainView}>
      <View style={styles.imageView}>
        <Text style={styles.imageText}>
          NS
        </Text>
      </View>
      <View style={styles.contextView}>
        <View style={styles.topView}>
          <Text> NAME </Text>
          <Text> TIME </Text>
        </View>
        <View style={styles.bottView}>
          <Text> MESSAGE </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainView: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 100,
    marginTop: 5
  },
  imageView: {
    flex: 3,
    height: '100%',
    backgroundColor: 'lightblue',
    borderRadius: 1000,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageText: {
    color: 'white',
    fontSize: 50,
    fontWeight: 'bold'
  },
  contextView: {
    flex: 9,
    justifyContent: 'space-between'
  },
  topView: {
    flex: 4,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  bottView: {
    flex: 5
  }
})