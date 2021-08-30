import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import SettingsScreen from '../../../features/settings/screens/SettingsScreen';
import CameraScreen from '../../../features/settings/screens/CameraScreen';
import EditPersonalProfileScreen from '../../../features/settings/screens/EditPersonalProfileScreen';
import EditBusinessInfoScreen from '../../../features/settings/screens/EditBusinessInfoScreen';
import EditExpertiseScreen from '../../../features/settings/screens/EditExpertiseScreen';
import EditSuccessScreen from '../../../features/settings/screens/EditSuccessScreen';
import AppBar from '../../../components/utils/AppBar';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator({ navigation, route }) {
  return (
    <SettingsStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <SettingsStack.Screen
        name='Settings'
        component={SettingsScreen}
        options={{ title: 'Settings' }}
      />
      <SettingsStack.Screen
        name='Camera'
        component={CameraScreen}
        options={{ title: 'Take Profile Picture' }}
      />
      <SettingsStack.Screen
        name='EditPersonalProfile'
        component={EditPersonalProfileScreen}
        options={{ title: 'Edit Personal Profile' }}
      />
      <SettingsStack.Screen
        name='EditBusinessInfo'
        component={EditBusinessInfoScreen}
        options={{ title: 'Edit Business Profile' }}
      />
      <SettingsStack.Screen
        name='EditExpertise'
        component={EditExpertiseScreen}
        options={{ title: 'Edit Business Profile' }}
      />
      <SettingsStack.Screen name='EditSuccess' component={EditSuccessScreen} />
    </SettingsStack.Navigator>
  );
}
