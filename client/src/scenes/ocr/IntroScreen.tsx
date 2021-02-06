import React, { useRef, useState } from 'react';
import { DocumentsPicker } from '_core';
import { View, Text } from 'react-native';
import { PickerService } from '_controllerServices';
import { XButton } from '_atoms';
import { ImageUploadSVG } from '_resources';
import { Common, Typography, Colors } from '_styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RNCamera, TakePictureResponse } from 'react-native-camera';
import { XBottomSheet } from '_organisms';
import { SourcePickerEnum } from '_models';

const pickerService = new PickerService();

const IntroScreen = ({ navigation }: any) => {
  /*const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);*/
  const [bottomSheetIsVisible, setBottomSheetIsVisible] = useState<boolean>(false);

  const camera = useRef<RNCamera>(null);

  /* const renderContent = () => (
    <View style={cameraStyles.container}>
      <RNCamera
        ref={camera}
        captureAudio={false}
        style={cameraStyles.preview}
        type={RNCamera.Constants.Type.back}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      />
      <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'space-around' }}>
        <TouchableOpacity onPress={takePicture} style={cameraStyles.capture}>
          <Text style={{ fontSize: 14 }}> SNAP </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsCameraVisible(false)} style={cameraStyles.capture}>
          <Text>Close</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
  const takePicture = () => {
    const options = { quality: 0.5, base64: true };
    camera.current &&
      camera.current
        .takePictureAsync(options)
        .then((data) => {
          setImageUri(data.uri);
          getTextFromImage(data);
          setIsCameraVisible(false);
        })
        .catch((err) => console.log(err));
  };
*/
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
        {/*<View style={{ marginHorizontal: 20 }}>*/}
        <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, color: Colors.BLUE, margin: 30 }}>
          {'Extract text from images (JPG, BMP, TIFF, GIF) and convert into editable Word, PDF output formats'}
        </Text>
        <XButton styles={{ margin: 20 }} title={'Take photo'} onPressCallback={showBottomSheet} />
        {/*</View>*/}
      </View>
      {/*<GenericModal isVisible={isCameraVisible} content={renderContent()} />*/}
      {/*{extractedText.length > 0 && (
        <View style={styles.cardContainer}>
          <Text>{extractedText}</Text>
        </View>
      )}*/}
      <XBottomSheet
        options={pickerService.BottomSheetOptions}
        visible={bottomSheetIsVisible}
        selectionCallback={(userChoice) => handleUserSelection(userChoice)}
      />
    </>
  );
};

export default IntroScreen;

/*const cameraStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});*/
