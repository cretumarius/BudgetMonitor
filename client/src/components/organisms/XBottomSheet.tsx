import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Divider } from 'react-native-elements';
import { BottomSheetOptionsModel } from '_models';
import { GenericModal } from '_molecules';
import { Typography, Colors, Mixins } from '_styles';

export const XBottomSheet = (props: {
  visible: boolean;
  options: BottomSheetOptionsModel[];
  selectionCallback: (value?: number) => void;
}) => {
  return (
    <GenericModal
      isVisible={props.visible}
      transparent={true}
      content={
        <TouchableOpacity activeOpacity={1} style={styles.container} onPress={() => props.selectionCallback()}>
          <View style={styles.background}>
            {props.options.map((opt, index) => (
              <View key={index} style={{ marginHorizontal: 30 }}>
                {index !== 0 && <Divider style={{ backgroundColor: Colors.GRAY_MEDIUM }} />}
                <TouchableOpacity key={index} onPress={() => props.selectionCallback(opt.optionId)}>
                  <Text style={styles.text}>{opt.optionName}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
          <TouchableOpacity onPress={() => props.selectionCallback()} activeOpacity={0.7} style={styles.closeBtn}>
            <Text style={{ fontSize: Typography.FONT_SIZE_16 }}>Închide</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      }
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(248,248,248, 0.6)',
  },
  background: {
    marginBottom: 30,
    width: '90%',
    borderRadius: 12,
    backgroundColor: Colors.WHITE,
    ...Mixins.boxShadow(Colors.SHADOW, { width: 0, height: 2 }, 6, 0.24),
    justifyContent: 'space-around',
  },
  text: { fontSize: Typography.FONT_SIZE_16, paddingVertical: 20 },
  closeBtn: {
    marginBottom: 30,
    width: '90%',
    borderRadius: 24,
    backgroundColor: Colors.WHITE,
    ...Mixins.boxShadow(Colors.SHADOW, { width: 0, height: 2 }, 6, 0.24),
    paddingVertical: 20,
    alignItems: 'center',
  },
});
