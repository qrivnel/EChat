import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView, Platform, Modal, ScrollView } from 'react-native'
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
    const flatListRef = useRef();
    const textInputRef = useRef();

    const [sendMessageButtonDisabled, setSendMessageButtonDisabled] = useState(false)

    const [user, setUser] = useState()
    const [messages, setMessages] = useState([])
    const [textInputHeight, setTextInputHeight] = useState(30)
    const [message, setMessage] = useState()

    useEffect(() => {
        try {
            firestore().collection('users').doc(route.params.userId).get()
                .then(res => setUser(res))
        } catch (error) {
            console.log(error);
        }
    }, [])

    useEffect(() => {
        try {
            firestore().collection('chats').doc(route.params.chatId)
                .onSnapshot(res => {
                    if (res.data() != undefined)
                        setMessages(res.data().messages)
                })
        } catch (error) {
            console.log(error);
        }
        return () => {
            try {
                firestore().collection('chats').doc(route.params.chatId).get()
                    .then(res => {
                        if (res.data().messages.length == 0) {
                            try {
                                firestore().collection('chats').doc(route.params.chatId).delete()
                            } catch (error) {
                                console.log(error);
                            }
                        }
                    })
            } catch (error) {
                console.log(error);
            }
        }
    }, [])
    const scrollToBottom = () => {
        if (flatListRef.current != undefined)
            flatListRef.current.scrollToEnd({ animated: true });
    };


    const sendMessage = async () => {
        try {
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
            }).then(() => {
                setSendMessageButtonDisabled(false)
                scrollToBottom()
            })
            setMessage('')
        } catch (error) {
            console.log(error);
        }
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

    const [isLoaded, setIsLoaded] = useState(false)
    useEffect(() => {
        setTimeout(() => {
            if (flatListRef.current != undefined)
                flatListRef.current.scrollToEnd({ animated: false });
            setIsLoaded(true)
        }, 700)
    }, [])

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
                        data={isLoaded ? messages : messages.slice().reverse()}
                        initialNumToRender={1000}
                        renderItem={({ item, index }) => {
                            return <Message
                                messageIndex={item.id}
                                user={item.user} text={item.text}
                                time={new Date(item.createdAt.seconds * 1000)}
                                bgcolor={
                                    item.user.id == currentUser.id
                                        ? 'lightgreen'
                                        : 'lightgray'
                                } />
                        }}
                        keyExtractor={item => item.id}
                        inverted={!isLoaded}
                    />
                    : <View style={styles.noMessageView}><Text style={styles.infoMessage}>Bir şeyler yaz..</Text></View>
            }
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View
                    id='bottomview'
                    style={[styles.bottomView, { height: textInputHeight + 20 }]}>
                    <TextInput
                        id='textinput'
                        ref={textInputRef}
                        multiline
                        style={[styles.textInput, { height: textInputHeight }]}
                        value={message}
                        onContentSizeChange={(event) => {
                            changeInputHeight(event.nativeEvent.contentSize.height)
                        }}
                        onChangeText={setMessage}
                        onFocus={() => {
                            setTimeout(() => {
                                if (flatListRef.current != undefined)
                                    flatListRef.current.scrollToEnd({ animated: true });
                            }, 300);
                        }}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            if (message != undefined && message != '') {
                                setSendMessageButtonDisabled(true)
                                sendMessage()
                            }
                        }}
                        disabled={sendMessageButtonDisabled}
                    >
                        <SendIcon width={28} height={28} fill={'blue'} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView> : null
}

const styles = StyleSheet.create({
    infoMessage: {
        color: 'gray',
        fontSize: 30,
    },
    noMessageView: {
        position: 'relative',
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
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