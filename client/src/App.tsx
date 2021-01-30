import React from 'react';
import FlashMessage from 'react-native-flash-message';
import { AuthContextProvider } from '_contexts';
import { Startup } from './scenes/Startup';

const App = () => (
  <AuthContextProvider>
    <Startup />
    <FlashMessage position="top" />
  </AuthContextProvider>
);

export default App;
