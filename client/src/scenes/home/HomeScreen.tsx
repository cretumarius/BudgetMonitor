import React from 'react';
import { Text, SafeAreaView } from 'react-native';
import { Common } from '_styles';

const HomeScreen = () => {
  return (
    <SafeAreaView style={Common.page}>
      <Text>Screen: Home</Text>
    </SafeAreaView>
  );
};

export default HomeScreen;
