import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native'
import firestore from '@react-native-firebase/firestore';

//COMPONENTS
import Chat from '../components/Chat'

export default function ChatsScreen() {
  const [users, setUsers] = useState()
  
  useEffect(() => {
    firestore().collection('users').get()
      .then(data => setUsers(data.docs))
  }, [])

  const data = Array(20)
    .fill(null)
    .map((_, i) => ({
      number: i
    }))

  return (
    <SafeAreaView style={styles.mainView}>
      {
        users == undefined
          ? <Text> Yükleniyor... </Text>
          : <FlatList
            data={users}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <Chat user={item.data()} />
                <View style={styles.serprator}></View>
              </View>
            )}
          />
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  serprator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: 'black',
    marginStart: 105,
    marginTop: 10
  },
  mainView: {
    flex: 1,
    backgroundColor: 'white'
  }
})