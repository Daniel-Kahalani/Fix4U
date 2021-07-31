import React from 'react';
import SettingsScreen from '../../features/settings/screens/SettingsScreen';
import CameraScreen from '../../features/settings/screens/CameraScreen';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator({ route, navigation }) {
  return (
    <SettingsStack.Navigator
      headerMode='screen'
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        // options={{
        //   header: () => null,
        // }}
        name='Settings'
        component={SettingsScreen}
      />
      <SettingsStack.Screen name='Camera' component={CameraScreen} />
    </SettingsStack.Navigator>
  );
}
