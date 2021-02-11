import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator, AuthNavigator } from '_navigation';
import { AuthContext } from '_contexts';
import { SecureStorage } from '_core';

export const Startup = () => {
  const { loginState, retrieveToken } = useContext(AuthContext);
  /*SecureStorage.deteleItem('biometricsActivationSkipped').then((res) => console.log(res));
  SecureStorage.deteleItem('firstName').then((res) => console.log(res));
  SecureStorage.deteleItem('lastName').then((res) => console.log(res));
  SecureStorage.deteleItem('biometricsConfigured').then((res) => console.log(res));
  SecureStorage.deteleItem('biometricsEnabled').then((res) => console.log(res));*/
  useEffect(() => retrieveToken(), []);

  return <NavigationContainer>{loginState.token ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>;
};
