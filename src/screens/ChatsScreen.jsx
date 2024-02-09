import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, StyleSheet, FlatList, TouchableOpacity, Alert, Platform, Modal, TextInput } from 'react-native'
import firestore from '@react-native-firebase/firestore';

//COMPONENTS
import ChatComponent from '../components/ChatComponent'
//SVGS
import AddIcon from '../assets/AddIcon.svg'

export default function ChatsScreen({ currentUser, navigation }) {
  const [chats, setChats] = useState()

  const [modalVisible, setModalVisible] = useState(false)
  const [username, setUsername] = useState()

  useEffect(() => {
    if (currentUser != undefined)
      firestore().collection('chats')
        .where('users', 'array-contains', currentUser.id)
        .onSnapshot(data => setChats(data.docs))
  }, [])

  const addChat = () => {
    Platform.OS == 'ios'
      ? Alert.prompt('Bir kullanıcı adı girin', 'Kullanıcı adı', (value) => createChatForIos(value))
      : setModalVisible(true)
  }

  const createChatForIos = async (value) => {
    if (value != undefined && value != '') {
      const getUser = await firestore().collection('users')
        .where('username', '==', value).get()
      if (getUser.docs.length != 0) {
        if (getUser.docs[0].id != currentUser.id) {
          let isExist = false
          chats.map((chat) => {
            isExist == false ? isExist = chat.data().users.includes(getUser.docs[0].id) : null
          })
          !isExist ? firestore().collection('chats').add({
            messages: [],
            users: [
              currentUser.id,
              getUser.docs[0].id
            ]
          }) : Alert.alert('Sohbet mevcut')
        } else {
          Alert.alert('Kendinizle sohbet oluşturamazsınız.')
        }
      }
    }
  }

  const createChat = async () => {
    setModalVisible(false)
    if (username != undefined && username != '') {
      const getUser = await firestore().collection('users')
        .where('username', '==', username).get()
      if (getUser.docs.length != 0) {
        if (getUser.docs[0].id != currentUser.id) {
          let isExist = false
          chats.map((chat) => {
            isExist == false ? isExist = chat.data().users.includes(getUser.docs[0].id) : null
          })
          !isExist ? firestore().collection('chats').add({
            messages: [],
            users: [
              currentUser.id,
              getUser.docs[0].id
            ]
          }) : Alert.alert('Sohbet mevcut')
        } else {
          Alert.alert('Kendinizle sohbet oluşturamazsınız.')
        }
      }
    }
    setUsername()
  }
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
      <TouchableOpacity
        id='addchat'
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onPress={addChat}>
        <AddIcon width={100} height={100} fill={'#1C274C'} />
      </TouchableOpacity>
      <Modal
        animationType='fade'
        visible={modalVisible}
        transparent={true}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10, width: '80%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Kullanıcı adı girin</Text>
            <Text style={{ marginBottom: 10 }}>Kullanıcı adı</Text>
            <TextInput
              style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 5, padding: 5 }}
              value={username}
              onChangeText={setUsername}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 }}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 10, backgroundColor: 'red', borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={createChat} style={{ padding: 10, backgroundColor: 'green', borderRadius: 5 }}>
                <Text style={{ color: 'white' }}>Oluştur</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
  }
})