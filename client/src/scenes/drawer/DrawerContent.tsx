import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Avatar, Title, Caption, Drawer, Text, TouchableRipple, Switch } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '_contexts';
import { Colors } from '_styles';

export function DrawerContent(props) {
  const paperTheme = useTheme();

  const { loginState, signOut } = useContext(AuthContext);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View style={{ flexDirection: 'row', marginTop: 15 }}>
              <Avatar.Image
                source={{
                  uri: 'https://api.adorable.io/avatars/50/abott@adorable.png',
                }}
                size={50}
              />
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
          {/* <Drawer.Section title="Preferences">
            <TouchableRipple
              onPress={() => {
                // toggleTheme();
                console.log('toggle theme');
              }}
            >
              <View style={styles.preference}>
                <Text>Dark Theme</Text>
                <View pointerEvents="none">
                  <Switch value={paperTheme.dark} />
                </View>
              </View>
            </TouchableRipple>
          </Drawer.Section>*/}
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
