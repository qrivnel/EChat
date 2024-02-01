import React from 'react';

//SCREENS
import { ChatsScreen, SettingsScreen } from './src/screens'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName='settings'
    >
      <Stack.Screen name='chats' component={ChatsScreen} />
      <Stack.Screen name='settings' component={SettingsScreen} />
    </Stack.Navigator>
  );
}

export default App;
