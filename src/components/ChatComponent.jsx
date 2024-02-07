import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

//COMPONENTS
import ProfilePicture from './ProfilePicture'

import firestore from '@react-native-firebase/firestore'

export default function ChatComponent({ userId, subtitle, onPress, route }) {
  const [user, setUser] = useState()

  useEffect(() => {
    firestore().collection('users').doc(userId).get()
      .then(res => setUser(res.data()))
  }, [])
  
  return user != undefined
    ? <TouchableOpacity
      style={styles.mainView}
      onPress={onPress}>

      <ProfilePicture userData={user} width={100} height={100} />

      <View style={styles.contextView}>
        <View style={styles.topView}>
          <Text style={styles.titleText}> {user.name} {user.surname} </Text>
          <Text> TIME </Text>
        </View>
        <View style={styles.bottView}>
          <Text style={styles.subtitleText}> {subtitle} </Text>
        </View>
      </View>
    </TouchableOpacity>
    : null
}

const styles = StyleSheet.create({
  titleText: {
    color: 'black',
    fontSize: 20,
    fontWeight: '800',
  },
  subtitleText: {
    color: 'gray',
    fontSize: 15,
    fontWeight: '300',
  },
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