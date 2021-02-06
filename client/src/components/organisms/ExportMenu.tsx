import React from 'react';
import { Colors, Mixins, Typography } from '_styles';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GenericModal } from '_molecules';
import { XButton } from '_atoms';
import { ExportOptionsEnum } from '_models';

const ExportMenu = (props: {
  isMenuVisible: boolean;
  setIsMenuVisible: (value?: ExportOptionsEnum) => void;
  navigation?: any;
}) => {
  return (
    <GenericModal
      isVisible={props.isMenuVisible}
      transparent
      content={
        <TouchableOpacity
          activeOpacity={1}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(248,248,248, 0.6)',
          }}
          onPress={() => props.setIsMenuVisible()}
        >
          <View style={styles.container}>
            <View style={{ padding: 15, alignItems: 'center' }}>
              <Text style={{ fontFamily: Typography.FONT_FAMILY_MEDIUM, color: Colors.BLUE }}>Menu</Text>
            </View>

            <View style={{ paddingHorizontal: 15 }}>
              <XButton
                styles={{ marginBottom: 20 }}
                onPressCallback={() => {
                  props.setIsMenuVisible(ExportOptionsEnum.PDF);
                }}
                title="Pdf"
              />
              <XButton
                styles={{ marginBottom: 20 }}
                onPressCallback={() => {
                  props.setIsMenuVisible(ExportOptionsEnum.WORD);
                }}
                title="Word"
              />
              <XButton
                styles={{ marginTop: 30 }}
                cancel
                onPressCallback={() => props.setIsMenuVisible()}
                title="Cancel"
              />
            </View>
          </View>
        </TouchableOpacity>
      }
    />
  );
};
export default ExportMenu;

const styles = StyleSheet.create({
  container: {
    width: '80%',
    height: 400,
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    ...Mixins.boxShadow(Colors.SHADOW, { width: 0, height: 2 }, 6, 0.24),
    justifyContent: 'space-around',
  },
});
