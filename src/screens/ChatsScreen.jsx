import React, { useEffect } from 'react'
import { View, Text, SafeAreaView } from 'react-native'
import firestore from '@react-native-firebase/firestore';

//COMPONENTS
import Chat from '../components/Chat'

export default function ChatsScreen() {
  useEffect(() => {
    firestore().collection('users').get()
  }, [])
  

  return (
    <SafeAreaView>
      <Chat />
    </SafeAreaView>
  )
}