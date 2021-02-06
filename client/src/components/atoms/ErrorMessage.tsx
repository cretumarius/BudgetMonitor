import React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

export const ErrorMessage = (props: { message: string | undefined }) => (
  <Animatable.View animation="fadeInLeft" duration={500}>
    <Text style={styles.errorMsg}>{props.message}</Text>
  </Animatable.View>
);

const styles = StyleSheet.create({
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
});
