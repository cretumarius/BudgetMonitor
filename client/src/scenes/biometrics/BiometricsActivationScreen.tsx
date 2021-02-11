import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Common, Colors, Mixins, Typography } from '_styles';
import { Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import { BiometricsImg, Complete } from '_resources';
import { XButton } from '_atoms';
import { Biometrics, SecureStorage } from '_core';
import LottieView from 'lottie-react-native';
import { AuthContext } from '_contexts';

const { height } = Dimensions.get('screen');
const height_logo = height * 0.2;

const BiometricsActivationScreen = (props: { closeCallback: (skip: boolean) => void }) => {
  const { toggleBiometrics } = useContext(AuthContext);
  const [success, setSuccess] = useState<boolean>(false);
  const onActivateTap = () => {
    Biometrics.authorize().then(async (res) => {
      if (res) {
        await SecureStorage.setItem('biometricsConfigured', 'true');
        await SecureStorage.setItem('biometricsEnabled', 'true');
        setSuccess(true);
        toggleBiometrics(true);
        setTimeout(() => props.closeCallback(false), 500);
      }
    });
  };
  return (
    <View style={Common.page}>
      <Header
        leftComponent={
          <Icon.Button name="home" onPress={() => props.closeCallback(true)} backgroundColor={Colors.GREEN} />
        }
        centerComponent={{ text: 'Securizează contul', style: { color: '#fff' } }}
        backgroundColor={Colors.GREEN}
      />
      <View style={[Mixins.flex_design('column', 'space-around', 'center'), { flex: 1 }]}>
        {!success ? (
          <Animatable.Image
            animation="bounceIn"
            duration={1500}
            source={BiometricsImg}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : (
          <LottieView
            source={Complete}
            style={{
              width: height_logo,
            }}
            autoPlay={true}
            loop={false}
          />
        )}
        <Text style={styles.text}>Dorești să te autentifici folosind capabilitățile biometrice?</Text>
      </View>
      {!success && (
        <View style={{ margin: 30 }}>
          <XButton styles={{ marginBottom: 30 }} title={'Activează'} onPressCallback={() => onActivateTap()} />
          <XButton cancel title={'Sari peste'} onPressCallback={() => props.closeCallback(true)} />
        </View>
      )}
    </View>
  );
};

export default BiometricsActivationScreen;

const styles = StyleSheet.create({
  logo: {
    width: height_logo,
    height: height_logo,
    borderRadius: 100,
  },
  text: {
    paddingHorizontal: 30,
    color: Colors.BLUE,
    textAlign: 'center',
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_24,
  },
});
