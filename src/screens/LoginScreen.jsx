import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

//FIREBASE
import firestore from '@react-native-firebase/firestore'

export default function LoginScreen({ setIsAuth, navigation }) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const handleLogin = () => {
        if (username != null && password != null) {
            firestore().collection('users').get()
                .then(res => {
                    res.docs.map(val => {
                        if (username == val.data().username && password == val.data().password){
                            AsyncStorage.setItem('currentuser', val.id)
                            setIsAuth(true)
                        }
                    })
                })
        }
    }

    const toSignup = () => {
        navigation.navigate('signup')
    }

    const test = () => {
        AsyncStorage.getItem('currentuser').then(res=>console.log(res))
    }

    return (
        <SafeAreaView style={styles.mainView}>
            <View style={styles.textInputsView}>
                <TextInput
                    id='inputusername'
                    placeholder='Kullanıcı adı'
                    placeholderTextColor={'gray'}
                    style={styles.textInputs}
                    autoCapitalize='none'
                    onChangeText={setUsername} />
                <TextInput
                    id='inputpassword'
                    placeholder='Şifre'
                    placeholderTextColor={'gray'}
                    secureTextEntry={true}
                    style={styles.textInputs}
                    autoCapitalize='none'
                    onChangeText={setPassword} />
            </View>
            <View style={styles.buttonView}>
                <TouchableOpacity
                    id='loginbutton'
                    style={[styles.button, { backgroundColor: '#478eff' }]}
                    onPress={handleLogin}>
                    <Text style={styles.buttonText}>Giriş yap</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    id='signupbutton'
                    style={[styles.button, { backgroundColor: '#969696' }]}
                    onPress={toSignup} >
                    <Text style={styles.buttonText}>Kayıt ol</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    id='test'
                    style={[styles.button, { backgroundColor: '#969696' }]}
                    onPress={test} >
                    <Text style={styles.buttonText}>test</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        borderWidth: 1,
        width: 100,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonView: {
        width: 250,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mainView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textInputsView: {
        width: 250,
        height: 150,
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    textInputs: {
        width: '100%',
        height: 50,
        borderWidth: 1.1,
        borderColor: 'black',
        borderRadius: 100,
        paddingLeft: 10,
    },
})