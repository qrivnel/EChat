import React from 'react'

//SCREENS
import { LoginScreen, SignupScreen } from '../screens'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

export default function AuthStacks({ setIsAuth }) {
  return (
    <Stack.Navigator
      initialRouteName='login'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen
        name='login' >
        {(props) => <LoginScreen {...props} setIsAuth={setIsAuth} />}
      </Stack.Screen>
      <Stack.Screen
        name='signup'
        component={SignupScreen} />
    </Stack.Navigator>
  )
}