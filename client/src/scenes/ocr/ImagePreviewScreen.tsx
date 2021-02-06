import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { Common, Mixins, Colors, Typography } from '_styles';
import { SCREEN_WIDTH } from '_utils';
import { XButton } from '_atoms';
import { ScanDocumentSVG, LoadingSpinnerBig } from '_resources';
import { GenericModal } from '_molecules';
import LottieView from 'lottie-react-native';
import { OcrService } from '_apiServices';
import { AuthContext } from '_contexts';
import { OcrResponseModel } from '_models';

const ocrService = new OcrService();
const ImagePreviewScreen = ({ navigation, route }: any) => {
  const { image } = route.params;
  const { loginState } = useContext(AuthContext);
  const [isLoaderVisible, setIsLoaderIsVisible] = useState<boolean>(false);

  const onResponseReceived = (ocr: OcrResponseModel) => {
    navigation.navigate('Result', { data: ocr });
    setIsLoaderIsVisible(false);
  };

  const onContinueTap = () => {
    setIsLoaderIsVisible(true);
    let data = new FormData();
    data.append('image', {
      uri: image.uri,
      name: image.name,
      type: image.type,
    });
    ocrService
      .extractText(data, loginState.token as string)
      .then((response) => onResponseReceived(response.data))
      .catch((err: any) => console.log(err));
  };

  return (
    <>
      <ScrollView style={Common.page}>
        <View style={Common.cardContainer}>
          <View style={styles.descriptionArea}>
            <Text style={styles.descriptionText}>
              The palatable sensation we lovingly refer to as The Cheeseburger has a distinguished and illustrious
              history.
            </Text>
            <ScanDocumentSVG style={{ flex: 1 }} />
          </View>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', marginVertical: 30 }}>
          <View style={[Common.card, { borderRadius: 10, padding: 10 }]}>
            <Image
              source={{ uri: `data:${image.mime};base64,${image.data}` }}
              style={{ width: SCREEN_WIDTH - 20, height: 400, overflow: 'hidden' }}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.buttonsArea}>
        <XButton
          styles={{ width: SCREEN_WIDTH / 2 - 50 }}
          title="Renunta"
          cancel
          onPressCallback={() => console.log('asd')}
        />
        <XButton styles={{ width: SCREEN_WIDTH / 2 - 50 }} title="Continua" onPressCallback={() => onContinueTap()} />
      </View>
      <GenericModal
        isVisible={isLoaderVisible}
        content={
          <View style={{ flex: 1, backgroundColor: Colors.WHITE, justifyContent: 'center', alignItems: 'center' }}>
            {
              <LottieView
                source={LoadingSpinnerBig}
                style={{
                  width: 200,
                  alignSelf: 'center',
                }}
                autoPlay
              />
            }
          </View>
        }
      />
    </>
  );
};

export default ImagePreviewScreen;

const styles = StyleSheet.create({
  descriptionArea: {
    marginHorizontal: 15,
    ...Mixins.flex_design('row', 'space-between', 'center'),
  },
  descriptionText: {
    marginRight: 10,
    flex: 1,
    color: Colors.BLUE,
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    letterSpacing: -0.48,
    lineHeight: 25,
  },

  buttonsArea: {
    margin: 30,
    ...Mixins.flex_design('row', 'space-between', 'center'),
  },
});
