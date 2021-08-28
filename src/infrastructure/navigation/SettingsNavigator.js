import React from 'react';
import SettingsScreen from '../../features/settings/screens/SettingsScreen';
import CameraScreen from '../../features/settings/screens/CameraScreen';
import EditPersonalProfileScreen from '../../features/settings/screens/EditPersonalProfileScreen';
import EditBusinessInfoScreen from '../../features/settings/screens/EditBusinessInfoScreen';
import EditExpertiseScreen from '../../features/settings/screens/EditExpertiseScreen';
import EditSuccessScreen from '../../features/settings/screens/EditSuccessScreen';
import AppBar from '../../components/utils/AppBar';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { usePushNotification } from '../utils/usePushNotification';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator({ navigation, route }) {
  usePushNotification(navigation);
  return (
    <SettingsStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
