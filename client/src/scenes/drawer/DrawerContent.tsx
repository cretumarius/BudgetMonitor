import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '_contexts';
import { Colors, Typography } from '_styles';
import { Av } from '_resources';
import { SecureStorage } from '_core';

export function DrawerContent(props) {
  const { loginState, toggleBiometrics, toggleBiometricsActivationModalVisibleState, signOut } = useContext(
    AuthContext,
  );

  const onBiometricAuthenticationToggle = async () => {
    const settings = await Promise.all([
      SecureStorage.getItem('biometricsConfigured'),
      SecureStorage.getItem('biometricsActivationSkipped'),
    ]);
    const biometricsConfigured = settings[0] == 'true';
    const userHasSkippedActivation = settings[1] == 'true';

    console.log('biometricsConfigured', biometricsConfigured);
    console.log('userHasSkippedActivation', userHasSkippedActivation);

    if (!biometricsConfigured && userHasSkippedActivation) {
      toggleBiometricsActivationModalVisibleState(true);
    } else {
      const newValue = !loginState.biometricsEnabled;
      SecureStorage.setItem('biometricsEnabled', newValue.toString()).then(() => toggleBiometrics(newValue));
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              {loginState.lastName === 'Marius-Valentin-Gheorghiță' ? (
                <Avatar.Image source={Av} size={50} />
              ) : (
                <View
                  style={{
                    borderRadius: 100,
                    width: 50,
                    height: 50,
                    backgroundColor: Colors.GRAY_LIGHT,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Text style={{ fontFamily: Typography.FONT_FAMILY_MEDIUM, color: Colors.GREEN, fontSize: 20 }}>
                    {`${loginState.firstName?.charAt(0)}${loginState.lastName?.charAt(0)}`}
                  </Text>
                </View>
              )}
              <View style={{ marginLeft: 15, flexDirection: 'column' }}>
                <Title style={styles.title}>{loginState.firstName}</Title>
                <Caption style={styles.caption}>{loginState.lastName}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            <DrawerItem
              icon={() => <Icon name="ocr" color={Colors.GREEN} size={25} />}
              label="OCR"
              onPress={() => {
                props.navigation.navigate('OCR');
              }}
            />
            <DrawerItem
              icon={() => <Icon name="scan-helper" color={Colors.GREEN} size={25} />}
              label="Document scanner"
              onPress={() => {
                props.navigation.navigate('Scanner');
              }}
            />
            <DrawerItem
              icon={() => <Icon name="merge" color={Colors.GREEN} size={25} />}
              label="Merge"
              onPress={() => {
                props.navigation.navigate('Merge');
              }}
            />
            {/*<DrawerItem
              icon={({ color, size }) => <Icon name="settings-outline" color={color} size={size} />}
              label="Settings"
              onPress={() => {
                props.navigation.navigate('SettingsScreen');
              }}
            />*/}
            {/*<DrawerItem
              icon={({ color, size }) => <Icon name="account-check-outline" color={color} size={size} />}
              label="Support"
              onPress={() => {
                props.navigation.navigate('SupportScreen');
              }}
            />*/}
          </Drawer.Section>
          <Drawer.Section title="Preferințe">
            <TouchableRipple onPress={onBiometricAuthenticationToggle}>
              <View style={styles.preference}>
                <Text>Autentificare biometrică</Text>
                <View pointerEvents="none">
                  <Switch
                    value={loginState.biometricsEnabled}
                    trackColor={{ false: Colors.GRAY_LIGHT, true: Colors.GREEN }}
                    thumbColor={Colors.WHITE}
                    ios_backgroundColor={Colors.GRAY_LIGHT}
                  />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section style={styles.bottomDrawerSection}>
        <DrawerItem
          icon={({ color, size }) => <Icon name="exit-to-app" color={color} size={size} />}
          label="Sign Out"
          onPress={() => {
            signOut();
          }}
        />
      </Drawer.Section>
    </View>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: 'bold',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  paragraph: {
    fontWeight: 'bold',
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: '#f4f4f4',
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
