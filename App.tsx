import React from 'react';
import { LogBox } from 'react-native';

//NAVIGATOR
import RootNavigator from './src/navigations/RootNavigator'

function App(): React.JSX.Element {
  LogBox.ignoreLogs(['RCTBridge required dispatch_sync to load RCTAccessibilityManager. This may lead to deadlocks']);
  return <RootNavigator />
}

export default App;
