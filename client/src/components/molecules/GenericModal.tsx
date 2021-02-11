import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';

export const GenericModal = (props: {
  isVisible: boolean;
  content?: any;
  transparent?: boolean;
  animation?: 'fade' | 'none' | 'slide' | undefined;
}) => {
  return (
    <Modal
      visible={props.isVisible}
      animationType={props.animation ? props.animation : 'fade'}
      transparent={props.transparent}
    >
      <View style={styles.mainContainer}>{props.content}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-around',
  },
});
