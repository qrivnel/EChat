import { Alert, Image, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage';

//FIREBASE
import firestore from '@react-native-firebase/firestore'
//SVGS
import EChatLogo from '../assets/EChatLogo.png'

export default function LoginScreen({ setIsAuth, navigation }) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)

    const handleLogin = () => {
        try {
            if (username != null && password != null) {
                firestore().collection('users').get()
                    .then(res => {
                        res.docs.map(val => {
                            if (username == val.data().username && password == val.data().password) {
                                AsyncStorage.setItem('currentuser', val.id)
                                setIsAuth(true)
                            }
                        })
                    })
            } else
                Alert.alert('Kullanıcı adı veya şifre yanlış')
        } catch (error) {
            console.log(error);
        }
    }

    const toSignup = () => {
        navigation.navigate('signup')
    }

    return (
        <SafeAreaView style={styles.mainView}>
            <Image style={{ width: 330, height: 250, resizeMode: 'stretch', alignSelf: 'center' }} source={EChatLogo} />
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                </View>
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
        backgroundColor: 'white'
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