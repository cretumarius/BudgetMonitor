import React from 'react';
import { Text, View } from 'react-native';
import { Colors, Common, Typography } from '_styles';
import { MergeSVG } from '_resources';
import { XButton } from '_atoms';

export const MergeIntroScreen = ({ navigation }: any) => {
  return (
    <View style={Common.cardContainer}>
      <MergeSVG />
      <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, color: Colors.BLUE, margin: 30 }}>
        {
          'Comasează imagini (JPG, BMP, TIFF, GIF) și pdf-uri într-un singur pdf rezultat pe care îl salvează în folderul Documente'
        }
      </Text>
      <XButton
        styles={{ margin: 20 }}
        title={'Continuă'}
        onPressCallback={() => navigation.navigate('FileSelection')}
      />
    </View>
  );
};

export default MergeIntroScreen;
