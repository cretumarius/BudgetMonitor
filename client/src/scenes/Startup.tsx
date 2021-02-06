import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator, AuthNavigator } from '_navigation';
import { AuthContext } from '_contexts';

export const Startup = () => {
  const { loginState, retrieveToken } = useContext(AuthContext);

  useEffect(() => retrieveToken(), []);

  return <NavigationContainer>{loginState.token ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>;
};
