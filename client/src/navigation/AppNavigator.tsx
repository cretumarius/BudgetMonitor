import React, { useContext, useEffect, useState } from 'react';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  OCRScreen,
  DrawerContent,
  ImagePreviewScreen,
  ResultScreen,
  DocumentScannerScreen,
  MergeIntroScreen,
  FileSelectionScreen,
  BiometricsActivationScreen,
} from '_scenes';
import { Colors } from '_styles';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '_contexts';
import { Biometrics, SecureStorage } from '_core';
import { GenericModal } from '_molecules';

const Drawer = createDrawerNavigator();

const OCRStack = createStackNavigator();
const ScannerStack = createStackNavigator();
const MergeStack = createStackNavigator();

const AppNavigator = () => {
  const { loginState, toggleBiometricsActivationModalVisibleState } = useContext(AuthContext);

  useEffect(() => handleBiometricsSetup(), []);

  const handleBiometricsSetup = () => {
    Promise.all([
      Biometrics.getBiometryType(),
      SecureStorage.getItem('biometricsActivationSkipped'),
      SecureStorage.getItem('biometricsConfigured'),
    ]).then((result) => {
      /*console.log('biometryType', result[0]);
      console.log('userHasSkippedActivation', Boolean(result[1]));
      console.log('biometricsConfigured', result[2]);*/
      const biometryType = result[0];
      const userHasSkippedActivation = result[1];
      const biometricsConfigured = result[2];
      if (biometryType && !biometricsConfigured && !userHasSkippedActivation) {
        setTimeout(() => toggleBiometricsActivationModalVisibleState(true), 1000);
      }
    });
  };

  const onBiometricsActivationSkip = async (wasSkipped: boolean) => {
    if (wasSkipped) {
      await SecureStorage.setItem('biometricsConfigured', 'false');
      await SecureStorage.setItem('biometricsActivationSkipped', 'true');
    }
    toggleBiometricsActivationModalVisibleState(false);
  };

  const OCRStackScreen = ({ navigation }: any) => (
    <OCRStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.GREEN,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <OCRStack.Screen
        name={'OCR'}
        component={OCRScreen}
        options={{
          title: 'OCR',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor={Colors.GREEN}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <OCRStack.Screen
        name={'ImagePreview'}
        component={ImagePreviewScreen}
        options={{
          title: 'Previzualizare',
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor={Colors.GREEN}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
      <OCRStack.Screen
        name={'Result'}
        component={ResultScreen}
        options={{
          title: 'Result',
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor={Colors.GREEN}
              onPress={() => navigation.goBack()}
            />
          ),
          headerRight: () =>
            loginState.isLoading && (
              <ActivityIndicator
                style={{ flexDirection: 'row', justifyContent: 'flex-end', marginRight: 20 }}
                size="small"
                color={Colors.WHITE}
              />
            ),
        }}
      />
    </OCRStack.Navigator>
  );

  const ScannerStackScreen = ({ navigation }: any) => (
    <ScannerStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.GREEN,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <ScannerStack.Screen
        name={'Scanner'}
        component={DocumentScannerScreen}
        options={{
          title: 'Scanner',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor={Colors.GREEN}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
    </ScannerStack.Navigator>
  );

  const MergeStackScreen = ({ navigation }: any) => (
    <MergeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.GREEN,
        },
        headerTintColor: Colors.WHITE,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <ScannerStack.Screen
        name={'Merge'}
        component={MergeIntroScreen}
        options={{
          title: 'Merge',
          headerLeft: () => (
            <Icon.Button
              name="ios-menu"
              size={25}
              backgroundColor={Colors.GREEN}
              onPress={() => navigation.openDrawer()}
            />
          ),
        }}
      />
      <ScannerStack.Screen
        name={'FileSelection'}
        component={FileSelectionScreen}
        options={{
          title: 'Selectează fișiere',
          headerLeft: () => (
            <Icon.Button
              name="arrow-back"
              size={25}
              backgroundColor={Colors.GREEN}
              onPress={() => navigation.goBack()}
            />
          ),
        }}
      />
    </MergeStack.Navigator>
  );

  return (
    <>
      <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
        <Drawer.Screen name="OCR" component={OCRStackScreen} />
        <Drawer.Screen name="Scanner" component={ScannerStackScreen} />
        <Drawer.Screen name="Merge" component={MergeStackScreen} />
      </Drawer.Navigator>
      <GenericModal
        isVisible={loginState.biometricsActivationModalIsVisible}
        content={<BiometricsActivationScreen closeCallback={(wasSkipped) => onBiometricsActivationSkip(wasSkipped)} />}
        animation="slide"
      />
    </>
  );
};

export default AppNavigator;
