import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator, AuthNavigator } from '_navigation';
import { AuthContext } from '_contexts';
import { View, ActivityIndicator } from 'react-native';

export const Startup = () => {
  const { loginState, retrieve_token } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      retrieve_token();
    }, 1000);
  }, []);

  const LoadingView = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  };

  const MainView = () => (
    <NavigationContainer>{!!loginState.userToken ? <AppNavigator /> : <AuthNavigator />}</NavigationContainer>
  );

  return loginState.isLoading ? <LoadingView /> : <MainView />;
};
