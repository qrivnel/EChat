import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'

//COMPONENTS
import ProfilePicture from '../components/ProfilePicture'
import Message from '../components/Message'
//FIREBASE
import firestore from '@react-native-firebase/firestore'
//ASSETS
import LeftArrow from '../assets/left-arrow.svg'
import SendIcon from '../assets/SendIcon.svg'

export default function ChatScreen({ route, navigation, currentUser }) {
    const flatListRef = useRef(null);

    const [user, setUser] = useState()
    const [messages, setMessages] = useState([])
    const [textInputHeight, setTextInputHeight] = useState(30)
    const [message, setMessage] = useState()

    useEffect(() => {
        firestore().collection('users').doc(route.params.userId).get()
            .then(res => setUser(res))
    }, [])

    useEffect(() => {
        firestore().collection('chats').doc(route.params.chatId)
            .onSnapshot(res => setMessages(res.data().messages))
    }, [])

    useEffect(() => {
        scrollToBottom();
    }, [messages, user]);

    const scrollToBottom = () => {
        if (flatListRef.current != null)
            flatListRef.current.scrollToEnd({ animated: true });
    };


    const sendMessage = async () => {
        if (message != undefined && message != '') {
            const previousMessageIndex = await firestore().collection('chats').doc(route.params.chatId).get()
                .then(res => res.data().messages.length != 0
                    ? res.data().messages[res.data().messages.length - 1].id
                    : -1
                )
            firestore().collection('chats').doc(route.params.chatId).update({
                messages: firestore.FieldValue.arrayUnion({
                    id: previousMessageIndex + 1,
                    user: {
                        id: currentUser.id,
                        username: currentUser.data().username
                    },
                    text: message,
                    createdAt: new Date(),
                })
            })
        }
        setMessage('')
    }

    const changeInputHeight = (height) => {
        if (Platform.OS == 'ios' && height < 105)
            setTextInputHeight(height + 13)
        else if (Platform.OS == 'android' && height < 125)
            setTextInputHeight((height - 15) + 13)
    }

    const navigateToChatList = () => {
        navigation.navigate('chatlist')
    }

    const navigateToContactScreen = () => {
        navigation.navigate('contact')
    }
    return user != undefined
        ? <SafeAreaView style={{ flex: 1 }}>
            <View
                id='headerview'
                style={styles.headerView}>
                <TouchableOpacity
                    onPress={navigateToChatList}>
                    <LeftArrow
                        width={25}
                        height={25}
                        fill={'#2989ff'} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={navigateToContactScreen}>
                    <ProfilePicture userData={user.data()} width={50} height={50} />
                    <Text
                        style={styles.usernameText}
                    > {user.data().username} </Text>
                </TouchableOpacity>
            </View>
            {
                messages.length != 0
                    ? <FlatList
                        ref={flatListRef}
                        data={messages}
                        renderItem={({ item }) => (
                            <Message messageIndex={item.id} user={item.user} text={item.text} time={new Date(item.createdAt.seconds * 1000)} bgcolor={
                                item.user.id == currentUser.id
                                    ? 'lightgreen'
                                    : 'lightgray'
                            } />
                        )}
                        keyExtractor={item => item.id}
                        getItemLayout={(data, index) => (
                            { length: 70, offset: 70 * index, index }
                        )}
                        initialScrollIndex={
                            messages.length > 9
                                ? messages.length - 1
                                : 0
                        }
                    />
                    : <View style={{ position: 'relative', flex: 8 }}><Text> MESAJ YOK</Text></View>
            }

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View
                    id='bottomview'
                    style={[styles.bottomView, { height: textInputHeight + 20 }]}>
                    <TextInput
                        id='textinput'
                        multiline
                        style={[styles.textInput, { height: textInputHeight }]}
                        value={message}
                        onContentSizeChange={(event) => {
                            changeInputHeight(event.nativeEvent.contentSize.height)
                        }}
                        onChangeText={setMessage}
                    />
                    <TouchableOpacity
                        onPress={sendMessage}>
                        <SendIcon width={28} height={28} fill={'blue'} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>


        </SafeAreaView> : null
}

const styles = StyleSheet.create({
    textInput: {
        width: 300,
        borderWidth: 2,
        borderRadius: 10,
        paddingLeft: 10,
    },
    bottomView: {
        position: 'relative',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        backgroundColor: 'e0e0e0',
        borderTopWidth: 3,
        borderColor: '#d6d6d6',
    },
    headerView: {
        display: 'flex',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#e0e0e0',
        borderBottomWidth: 3,
        borderColor: '#d6d6d6',
    },
    usernameText: {
        color: 'black',
        fontSize: 25,
        fontWeight: '400'
    }
})