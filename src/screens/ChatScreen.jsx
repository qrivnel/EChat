import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput, FlatList, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'

//COMPONENTS
import ProfilePicture from '../components/ProfilePicture'
//FIREBASE
import firestore from '@react-native-firebase/firestore'
//ASSETS
import LeftArrow from '../assets/left-arrow.svg'
import SendIcon from '../assets/SendIcon.svg'

export default function ChatScreen({ route, navigation }) {
    const [user, setUser] = useState()
    const [textInputHeight, setTextInputHeight] = useState(30)

    useEffect(() => {
        firestore().collection('users').doc(route.params.userId).get()
            .then(res => setUser(res))
    }, [])

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
                    style={{}}
                    onPress={navigateToChatList}>
                    <LeftArrow
                        width={25}
                        height={25}
                        fill={'#2989ff'} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ flexDirection: 'row', alignItems: 'center' }}
                    onPress={navigateToContactScreen}>
                    {
                        <ProfilePicture userData={user.data()} width={50} height={50} />
                    }
                    <Text
                        style={styles.usernameText}
                    > {user.data().username} </Text>
                </TouchableOpacity>



            </View>

            <FlatList />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View
                    id='bottomview'
                    style={{ position: 'relative', flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center', bottom: 0, left: 0, right: 0, width: '100%', height: 50, backgroundColor: 'e0e0e0', borderTopWidth: 3, borderColor: '#d6d6d6', padding: 5 }}>
                    <TextInput
                        multiline={true}
                        style={{ width: 300, height: 30, borderWidth: 2, borderRadius: 10, paddingLeft: 10 }}
                    />
                    <SendIcon width={28} height={28} fill={'blue'} />
                </View>
            </KeyboardAvoidingView>


        </SafeAreaView> : null
}

const styles = StyleSheet.create({
    headerView: {
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