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
    try {
      if (currentUser != undefined)
        firestore().collection('chats')
          .where('users', 'array-contains', currentUser.id)
          .onSnapshot(snapshot => {
            if (snapshot != null) {
              const sortedChats = snapshot.docs
                .map(doc => doc)
                .sort((a, b) => {
                  if (a.data().messages.length != 0 && b.data().messages.length != 0) {
                    const dateA = new Date(a.data().messages[a.data().messages.length - 1].createdAt.seconds * 1000)
                    const dateB = new Date(b.data().messages[b.data().messages.length - 1].createdAt.seconds * 1000)
                    return dateB - dateA
                  }
                })
              const filteredChats = sortedChats.filter(chat => chat.data().messages.length != 0);
              setChats(filteredChats)
            }
          })
    } catch (error) {
      console.log(error);
    }
  }, [currentUser])

  const addChat = () => {
    Platform.OS == 'ios'
      ? Alert.prompt('Bir kullanıcı adı girin', 'Kullanıcı adı', (value) => createChatForIos(value))
      : setModalVisible(true)
  }

  const createChatForIos = async (value) => {
    try {
      if (value != undefined && value != '' && value != null) {
        const getUser = await firestore().collection('users')
          .where('username', '==', value).get()
        if (getUser.docs.length != 0) {
          if (getUser.docs[0].id != currentUser.id) {
            firestore().collection('chats')
              .where('users', 'array-contains', currentUser.id)
              .get()
              .then(res => {
                const filteredRes = res.docs.filter(doc => doc.data().users.includes(getUser.docs[0].id))
                filteredRes.length == 0
                  ? firestore().collection('chats').add({
                    messages: [],
                    users: [
                      currentUser.id,
                      getUser.docs[0].id
                    ]
                  }).then(res1 => {
                    firestore().collection('chats').doc(res1.id).get()
                      .then((res2) => navigation.navigate('chatdetail', { chatId: res1.id, userId: res2.data().users.find(user => user != currentUser.id) }))
                  }) : Alert.alert('Sohbet mevcut')
              })
          } else
            Alert.alert('Kendinizle sohbet oluşturamazsınız.')
        } else
          Alert.alert('Kullanıcı mevcut değil')
      }
    } catch (error) {
      console.log(error);
    }
  }

  const createChat = async () => {
    try {
      setModalVisible(false)
      if (username != undefined && username != '') {
        const getUser = await firestore().collection('users')
          .where('username', '==', username).get()
        if (getUser.docs.length != 0) {
          if (getUser.docs[0].id != currentUser.id) {
            firestore().collection('chats')
              .where('users', 'array-contains', currentUser.id)
              .get()
              .then(res => {
                const filteredRes = res.docs.filter(doc => doc.data().users.includes(getUser.docs[0].id))
                filteredRes.length == 0
                  ? firestore().collection('chats').add({
                    messages: [],
                    users: [
                      currentUser.id,
                      getUser.docs[0].id
                    ]
                  }).then(res1 => {
                    firestore().collection('chats').doc(res1.id).get()
                      .then((res2) => navigation.navigate('chatdetail', { chatId: res1.id, userId: res2.data().users.find(user => user != currentUser.id) }))
                  }) : Alert.alert('Sohbet mevcut')
              })
          } else {
            Alert.alert('Kendinizle sohbet oluşturamazsınız.')
          }
        } else
          Alert.alert('Kullanıcı mevcut değil')
      }
      setUsername()
    } catch (error) {
      console.log(error);
    }
  }


  return currentUser != undefined
    ? <SafeAreaView
      style={styles.mainView}>
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
                  onPress={() => navigation.navigate('chatdetail', { chatId: item.id, userId: item.data().users.find(user => user != currentUser.id,) })} />
                <View style={styles.serprator}></View>
              </View>
            )
            }
          /> : <Text style={{ color: 'gray', fontSize: 30, }}>Bir sohbet başlat</Text>
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