import React, { useContext } from 'react';
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
} from '_scenes';
import { Colors } from '_styles';
import { ActivityIndicator } from 'react-native';
import { AuthContext } from '_contexts';
import FileSelectionScreen from '../scenes/merge/FileSelectionScreen';

const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();

const OCRStack = createStackNavigator();
const ScannerStack = createStackNavigator();
const MergeStack = createStackNavigator();

const AppNavigator = () => {
  const { loginState } = useContext(AuthContext);

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
          title: 'Image preview',
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
          title: 'Select files',
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
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="OCR" component={OCRStackScreen} />
      <Drawer.Screen name="Scanner" component={ScannerStackScreen} />
      <Drawer.Screen name="Merge" component={MergeStackScreen} />
    </Drawer.Navigator>
    /*<Tab.Navigator tabBarOptions={{ activeTintColor: Colors.PRIMARY, inactiveTintColor: Colors.SECONDARY }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Tab.Screen
        name="About"
        component={AboutScreen}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'About',
        }}
      />
    </Tab.Navigator>*/
  );
};

export default AppNavigator;
