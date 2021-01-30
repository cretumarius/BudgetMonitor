import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, AboutScreen } from '_scenes';
import { Colors } from '_styles';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <Tab.Navigator tabBarOptions={{ activeTintColor: Colors.PRIMARY, inactiveTintColor: Colors.SECONDARY }}>
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
    </Tab.Navigator>
  );
};

export default AppNavigator;
