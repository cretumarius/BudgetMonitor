import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { XButton } from '_atoms';
import Permissions from 'react-native-permissions';
import { SCREEN_WIDTH } from '_utils';
import { GenericModal } from '_molecules';
import { Colors, Common, Typography } from '_styles';
import { ScannerSVG } from '_resources';
import PdfScanner from '@woonivers/react-native-document-scanner';

const DocumentScannerScreen = () => {
  const [isCameraVisible, setIsCameraVisible] = useState<boolean>(false);

  const documentScannerElement = useRef(null);
  const [data, setData] = useState(null);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    async function requestCamera() {
      const result = await Permissions.request(
        Platform.OS === 'android' ? 'android.permission.CAMERA' : 'ios.permission.CAMERA',
      );
      if (result === 'granted') setAllowed(true);
    }
    requestCamera();
  }, []);
  console.log(data);

  useEffect(() => {
    if (!!data) {
      setIsCameraVisible(false);
    }
  }, [data]);

  function handleOnPressRetry() {
    setIsCameraVisible(true);
    setData(null);
  }
  function handleOnPress() {
    documentScannerElement.current.capture();
  }
  if (!allowed) {
    console.log('You must accept camera permission');
    return (
      <View style={styles.permissions}>
        <Text>You must accept camera permission</Text>
      </View>
    );
  }
  const renderContent = () => {
    return (
      <React.Fragment>
        <PdfScanner
          ref={documentScannerElement}
          style={styles.scanner}
          onPictureTaken={setData}
          overlayColor="rgba(255,130,0, 0.7)"
          enableTorch={false}
          quality={0.5}
          detectionCountBeforeCapture={5}
          detectionRefreshRateInMS={50}
          saveInAppDocument
          saveOnDevice
        />
        <TouchableOpacity onPress={handleOnPress} style={styles.button}>
          <Text style={styles.buttonText}>Take picture</Text>
        </TouchableOpacity>
      </React.Fragment>
    );
  };

  return (
    <>
      {!!data ? (
        <React.Fragment>
          <View style={{ flex: 1 }}>
            <View style={{ flex: 1, justifyContent: 'center', marginVertical: 30 }}>
              <View style={[Common.card, { borderRadius: 10 }]}>
                <Image
                  style={{ width: SCREEN_WIDTH - 20, height: 500, resizeMode: 'contain', margin: 10 }}
                  source={{ uri: data.croppedImage }}
                />
              </View>
            </View>
            <XButton styles={{ margin: 20 }} title={'Retake'} onPressCallback={handleOnPressRetry} />
          </View>
        </React.Fragment>
      ) : (
        <View style={Common.cardContainer}>
          <ScannerSVG />
          <Text style={{ fontFamily: Typography.FONT_FAMILY_REGULAR, color: Colors.BLUE, margin: 30 }}>
            {'Crop rectangle area and export to documents directory'}
          </Text>
          <XButton styles={{ margin: 20 }} title={'Scan'} onPressCallback={() => setIsCameraVisible(true)} />
        </View>
      )}
      <GenericModal isVisible={isCameraVisible} content={renderContent()} />
    </>
  );
};

export default DocumentScannerScreen;

const styles = StyleSheet.create({
  scanner: {
    flex: 1,
    aspectRatio: undefined,
  },
  button: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 32,
  },
  buttonText: {
    backgroundColor: 'rgba(245, 252, 255, 0.7)',
    fontSize: 32,
  },
  preview: {
    flex: 1,
    width: SCREEN_WIDTH,
    resizeMode: 'cover',
  },
  permissions: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
