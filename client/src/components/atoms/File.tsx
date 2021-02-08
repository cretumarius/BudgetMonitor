import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
// import { openFile } from '_core';

import { Mixins, Colors, Typography } from '_styles';
import FileViewer from 'react-native-file-viewer';
import { Trash } from '_resources';

export const File = (props: { name: string; uri: string; removeCallback: () => void }) => {
  const onFileOpen = async (path: string) => {
    await FileViewer.open(path);
  };

  return (
    <View style={fileStyle.container}>
      <TouchableOpacity onPress={() => onFileOpen(props.uri)}>
        <Text
          style={{
            paddingLeft: 50,
            flexWrap: 'wrap',
            width: 300,
            textAlignVertical: 'center',
            fontFamily: Typography.FONT_FAMILY_MEDIUM,
          }}
        >
          {props.name}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginRight: 20 }} onPress={props.removeCallback}>
        <Trash color={Colors.GREEN} size={35} />
      </TouchableOpacity>
    </View>
  );
};

const fileStyle = StyleSheet.create({
  container: {
    ...Mixins.flex_design('row', 'space-between', 'center'),
    paddingBottom: 5,
  },
});
