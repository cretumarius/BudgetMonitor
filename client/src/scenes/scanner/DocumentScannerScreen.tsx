import React from 'react';
import { View, Text } from 'react-native';
import { Colors, Common, Typography } from '_styles';
import { ImageUploadSVG, ScannerSVG } from '_resources';
import { XButton } from '_atoms';

const DocumentScannerScreen = () => {
  return (
    <View style={Common.page}>
      <View style={Common.cardContainer}>
        <ScannerSVG />
        {/*<View style={{ marginHorizontal: 20 }}>*/}
        <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, color: Colors.BLUE, margin: 30 }}>
          {'Extract text from images (JPG, BMP, TIFF, GIF) and convert into editable Word, PDF output formats'}
        </Text>
        <XButton styles={{ margin: 20 }} title={'Take photo'} onPressCallback={() => {}} />
        {/*</View>*/}
      </View>
    </View>
  );
};

export default DocumentScannerScreen;
