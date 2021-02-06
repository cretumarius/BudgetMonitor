import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, StyleProp, ViewStyle, ActivityIndicator } from 'react-native';
import { Mixins, Colors, Typography } from '_styles';
import {FONT_FAMILY_LIGHT, FONT_FAMILY_MEDIUM} from '../../styles/typography';

export const XButton = (props: {
  title: string;
  onPressCallback: () => void;
  cancel?: boolean;
  styles?: StyleProp<ViewStyle>;
  loading?: boolean;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={!props.loading ? 0.5 : 1}
      onPress={() => !props.loading && props.onPressCallback()}
      style={[{ flexDirection: 'row' }, props.styles]}
    >
      <View style={[styles.container, { backgroundColor: props.cancel ? Colors.ROSE : Colors.GREEN }]}>
        <View style={{ flex: 1 }} />
        <Text
          style={[styles.text, { color: props.cancel ? '#EA0076' : Colors.WHITE, marginLeft: props.loading ? 20 : 0 }]}
        >
          {props.title}
        </Text>
        <View style={{ flex: 1 }}>
          {props.loading && (
            <ActivityIndicator
              style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}
              size="small"
              color={Colors.WHITE}
            />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 60,
    borderRadius: 8,
    ...Mixins.flex_design('row', 'center', 'center'),
  },
  text: {
    fontFamily: FONT_FAMILY_MEDIUM,
    fontSize: Typography.FONT_SIZE_18,
    textAlign: 'center',
  },
});
