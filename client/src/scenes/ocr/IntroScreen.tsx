import React, { useState } from 'react';
import { DocumentsPicker } from '_core';
import { View, Text } from 'react-native';
import { PickerService } from '_controllerServices';
import { XButton } from '_atoms';
import { ImageUploadSVG } from '_resources';
import { Common, Typography, Colors } from '_styles';
import { XBottomSheet } from '_organisms';
import { SourcePickerEnum } from '_models';

const pickerService = new PickerService();

const IntroScreen = ({ navigation }: any) => {
  const [bottomSheetIsVisible, setBottomSheetIsVisible] = useState<boolean>(false);
  const showBottomSheet = () => {
    setBottomSheetIsVisible(true);
  };

  function handleUserSelection(userChoice?: SourcePickerEnum) {
    if (userChoice === undefined) {
      setBottomSheetIsVisible(false);
      return;
    }
    DocumentsPicker.pick(userChoice).then((image) => {
      navigation.navigate('ImagePreview', { image: image });
      setBottomSheetIsVisible(false);
    });
  }

  return (
    <>
      <View style={Common.cardContainer}>
        <ImageUploadSVG />
        <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, color: Colors.BLUE, margin: 30 }}>
          {'Extract text from images (JPG, BMP, TIFF, GIF) and convert into editable Word, PDF output formats'}
        </Text>
        <XButton styles={{ margin: 20 }} title={'Take photo'} onPressCallback={showBottomSheet} />
      </View>
      <XBottomSheet
        options={pickerService.BottomSheetOptionsForImages}
        visible={bottomSheetIsVisible}
        selectionCallback={(userChoice) => handleUserSelection(userChoice)}
      />
    </>
  );
};

export default IntroScreen;
