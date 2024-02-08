import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import firestore from '@react-native-firebase/firestore';

//COMPONENTS
import ChatComponent from '../components/ChatComponent'

export default function ChatsScreen({ currentUser, navigation }) {
  const [chats, setChats] = useState()

  useEffect(() => {
    if (currentUser != undefined)
      firestore().collection('chats')
        .where('users', 'array-contains', currentUser.id)
        .onSnapshot(data => setChats(data.docs))
  }, [])

  return currentUser != undefined
    ? <SafeAreaView style={styles.mainView}>
      {
        chats != undefined
          ? <FlatList
            data={chats}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View>
                <ChatComponent
                  userId={item.data().users.find(user => user != currentUser.id)}
                  chatId={item.id}
                  onPress={() => navigation.navigate('chatdetail', { chatId: item.id, userId: item.data().users.find(user => user != currentUser.id) })} />
                <View style={styles.serprator}></View>
              </View>
            )
            }
          /> : <Text> Yükleniyor... </Text>
      }
    </SafeAreaView >
    : <Text> Yükleniyor... </Text>
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