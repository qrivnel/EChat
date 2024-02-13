import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from 'react'

//FIREBASE
import firestore from '@react-native-firebase/firestore'

//SVGS
import OkIcon from '../assets/OkIcon.svg'
import CrossIcon from '../assets/CrossIcon.svg'

export default function SignupScreen({ navigation }) {
  const [clicked, setClicked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [username, setUsername] = useState('')
  const [usernameCheck, setUsernameCheck] = useState(false)
  const [password, setPassword] = useState('')
  const [passwordAgain, setPasswordAgain] = useState('')

  const checkPasswords = () => {
    if (password == passwordAgain)
      return true
    return false
  }

  useEffect(() => {
    try {
      firestore().collection('users')
        .where('username', '==', username).get()
        .then(res => {
          res.docs.length != 0
            ? setUsernameCheck(true)
            : setUsernameCheck(false)
        })
    } catch (error) {
      console.log(error);
    }
  }, [username])

  const createUser = () => {
    try {
      setClicked(true)
      if (checkPasswords && name != '' && surname != '' && !usernameCheck && username != '' && password != '' && passwordAgain != '') {
        setIsLoading(true)
        firestore().collection('users').add({
          about: '',
          age: 0,
          eposta: '@gmail.com',
          lastActivity: '',
          name: name,
          password: password,
          status: false,
          surname: surname,
          telno: '',
          username: username
        }).then(res => {
          setIsLoading(false)
          navigation.navigate('login')
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  const navigateToLogin = () => {
    navigation.navigate('login')
  }

  const Icon = (prop) => {
    return (
      prop != ''
        ? <OkIcon width={50} height={50} fill={'green'} />
        : <CrossIcon width={50} height={50} fill={'red'} />
    )
  }
  const UsernameIcon = (prop) => {
    return (
      prop != '' && !usernameCheck
        ? <OkIcon width={50} height={50} fill={'green'} />
        : <CrossIcon width={50} height={50} fill={'red'} />
    )
  }
  const PasswordIcon = (prop) => {
    return (
      prop != '' && checkPasswords()
        ? <OkIcon width={50} height={50} fill={'green'} />
        : <CrossIcon width={50} height={50} fill={'red'} />
    )
  }
  return (
    <SafeAreaView
      style={styles.mainView}>
      <View style={styles.textInputView}>
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              placeholder='Ad'
              onChangeText={setName} />
            {
              clicked ? Icon(name) : null
            }
          </View>
          {name == '' && clicked ? <Text style={styles.errorMessageText}>Ad boş olamaz!</Text> : null}
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              placeholder='Soyad'
              onChangeText={setSurname} />
            {
              clicked ? Icon(surname) : null
            }
          </View>
          {surname == '' && clicked ? <Text style={styles.errorMessageText}>Soyad boş olamaz!</Text> : null}
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              placeholder='Kullanıcı adı'
              autoCapitalize='none'
              onChangeText={setUsername} />
            {
              clicked ? UsernameIcon(username) : null
            }
          </View>
          {clicked && username == '' ? <Text style={styles.errorMessageText}>Kullanıcı adı boş olamaz!</Text> : null}
          {clicked && username != '' && usernameCheck ? <Text style={styles.errorMessageText}>Böyle bir kullanıcı zaten mevcut</Text> : null}
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              placeholder='Parola'
              secureTextEntry
              onChangeText={(value) => console.log(value)} />
            {
              clicked ? PasswordIcon(password) : null
            }
          </View>
          {clicked && password == '' ? <Text style={styles.errorMessageText}>Parola boş olamaz!</Text> : null}
          {clicked && password != '' && !checkPasswords() ? <Text style={styles.errorMessageText}>Parolalar aynı olmalı!</Text> : null}
        </View>

        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              placeholder='Parola tekrar'
              secureTextEntry
              onChangeText={setPasswordAgain} />
            {
              clicked ? PasswordIcon(passwordAgain) : null
            }
          </View>
          {clicked && (passwordAgain == '' || !checkPasswords()) ? <Text style={styles.errorMessageText}>Parolalar aynı olmalı!</Text> : null}
        </View>

      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'green' }]}
          onPress={createUser}
          disabled={false}>
          <Text
            style={styles.buttonText}>Kayıt ol</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: 'lightgray' }]}
          onPress={navigateToLogin}>
          <Text
            style={styles.buttonText} >Geri dön</Text>
        </TouchableOpacity>
      </View>
      {
        isLoading ? <Text style={{ fontSize: 50, fontWeight: 'bold', alignSelf: 'center', color: 'gray', marginTop: 50 }} >Yükleniyor..</Text> : null
      }
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  buttonView: {
    width: 250,
    flexDirection: 'row',
    marginLeft: 45.7,
    marginTop: 30,
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 15,
    color: 'black',
  },
  button: {
    borderWidth: 1,
    width: 100,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputView: {
    width: '100%',
    height: 400,
    marginLeft: 20,
    justifyContent: 'space-between',
  },
  errorMessageText: {
    color: 'red',
    marginLeft: 20,
    marginTop: 5,
  },
  textInput: {
    borderWidth: 1,
    width: 300,
    height: 50,
    marginRight: 15,
    borderRadius: 100,
    paddingLeft: 10,
  },
  mainView: {
    flex: 1,
  }
})