import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { AuthContextProvider } from '_contexts';
import { Startup } from './scenes/Startup';
import { StatusBar } from 'react-native';
import { Colors } from '_styles';

const App = () => {
  return (
    <AuthContextProvider>
      <StatusBar backgroundColor={Colors.GREEN} barStyle="light-content" />
      <Startup />
      <FlashMessage position="top" />
    </AuthContextProvider>
  );
};
export default App;
