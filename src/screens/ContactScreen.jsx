import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

//FIREBASE
import firestore from '@react-native-firebase/firestore'
//SVGS
import LeftArrow from '../assets/left-arrow.svg'
//COMPONENTS
import ProfilePicture from '../components/ProfilePicture'

export default function ContactScreen({ route, navigation }) {
  const [currentUser, setCurrentUser] = useState()
  useEffect(() => {
    firestore().collection('users').doc(route.params.userId).get()
      .then(res => {
        setCurrentUser(res)
      })
  }, [])

  const navigateToSettings = () => {
    navigation.goBack()
  }

  return currentUser != undefined
    ? <SafeAreaView
      style={styles.mainView}>

      <View id='headerView'
        style={styles.headerView} >
        <TouchableOpacity
          style={{ position: 'absolute', top: 0, left: 0 }}
          onPress={navigateToSettings}>
          <LeftArrow
            width={25}
            height={25}
            fill={'#2989ff'} />
        </TouchableOpacity>

        <Text
          id='header'
          style={styles.headerText}
        > Kişi Bilgisi </Text>
      </View>

      <View
        id='scrollView'
        style={{ alignItems: 'center' }}>
        <View
          id='contactview'
          style={{ alignItems: 'center' }}>
          <View
            style={{ shadowColor: currentUser.data().bgColor, shadowOffset: { width: 0, height: 0 }, shadowOpacity: 1, shadowRadius: 100, elevation: 100, borderRadius: 100 }} >
            <ProfilePicture userData={currentUser.data()} width={150} height={150} />
          </View>
          <Text style={styles.usernameText}> {currentUser.data().username} </Text>
          <Text style={styles.telnoText}> {currentUser.data().telno} </Text>
        </View>
        <View
          id='aboutview'
          style={styles.aboutView}>
          <Text
            id='abouttext'
            style={styles.aboutText}> {currentUser.data().about} </Text>
        </View>
      </View>
    </SafeAreaView> : null
}

const styles = StyleSheet.create({
  colorsView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50,
    flexWrap: 'wrap',
  },
  aboutText: {
    color: 'black',
    fontSize: 25,
  },
  aboutView: {
    width: 350,
    minHeight: 50,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  telnoText: {
    color: 'gray',
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10
  },
  usernameText: {
    color: 'black',
    fontSize: 50,
    fontWeight: '600',
  },
  headerView: {
    width: '100%',
    height: 25,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  headerText: {
    width: 105,
    color: 'black',
    fontSize: 20,
    fontWeight: '700',
  },
  mainView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 5
  }
})