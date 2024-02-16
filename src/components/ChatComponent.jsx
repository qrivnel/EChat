import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'

//COMPONENTS
import ProfilePicture from './ProfilePicture'

import firestore from '@react-native-firebase/firestore'

export default function ChatComponent({ userId, onPress, chatId }) {
  const [user, setUser] = useState()
  const [time, setTime] = useState('')
  const [subtitle, setSubtitle] = useState('Henüz mesaj yok')

  const prepareTime = (seconds) => {
    const today = new Date()
    const oneDayAgo = new Date(today.getTime() - (24 * 60 * 60 * 1000))
    const oneWeekAgo = new Date(today.getTime() - (7 * 24 * 60 * 60 * 1000))
    const messageDate = new Date(seconds * 1000)

    const clockString = `${messageDate.getHours()}:${messageDate.getMinutes() < 10
      ? '0' + messageDate.getMinutes()
      : messageDate.getMinutes()
      }`
    const dayName = messageDate.toLocaleString('tr-TR', { weekday: 'long' })
    const dateString = `${today.getDate() < 10
      ? '0' + messageDate.getDate()
      : messageDate.getDate()
      }.${messageDate.getMonth() < 10
        ? '0' + messageDate.getMonth()
        : messageDate.getMonth()
      }.${messageDate.getFullYear()}`

    if (messageDate > oneDayAgo)
      setTime(clockString)
    else if (messageDate < oneDayAgo && messageDate > oneWeekAgo)
      setTime(dayName)
    else if (messageDate < oneWeekAgo)
      setTime(dateString)
  }

  useEffect(() => {
    try {
      firestore().collection('chats').doc(chatId)
        .onSnapshot(data => {
          if (data.data() != undefined && data.data().messages.length != 0) {
            prepareTime(data.data().messages[data.data().messages.length - 1].createdAt.seconds);
            setSubtitle(data.data().messages[data.data().messages.length - 1].text)
          }
        })
    } catch (error) {
      console.log(error);
    }
  }, [])

  useEffect(() => {
    try {
      firestore().collection('users').doc(userId)
        .onSnapshot(res => setUser(res.data()))
    } catch (error) {
      console.log(error);
    }
  }, [])

  return user != undefined
    ? <TouchableOpacity
      style={styles.mainView}
      onPress={onPress}>

      <ProfilePicture userData={user} width={80} height={80} />

      <View style={styles.contextView}>
        <View style={styles.topView}>
          <Text style={styles.titleText}> {user.name} {user.surname} </Text>
          <Text> {time} </Text>
        </View>
        <View style={styles.bottView}>
          <Text style={styles.subtitleText}> {
            subtitle
          } </Text>
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
    height: 80,
    marginTop: 5
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