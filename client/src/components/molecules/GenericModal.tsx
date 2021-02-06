import React from 'react';
import { View, Modal, StyleSheet } from 'react-native';

export const GenericModal = (props: { isVisible: boolean; content?: any; transparent?: boolean }) => {
  return (
    <Modal visible={props.isVisible} animationType="slide" transparent={props.transparent}>
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
