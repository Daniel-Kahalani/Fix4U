import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeScreen from '../../features/account/screens/WelcomeScreen';
import LoginScreen from '../../features/account/screens/LoginScreen';
import UserTypeScreen from '../../features/account/screens/UserTypeScreen';
import BusinessInfoScreen from '../../features/account/screens/BusinessInfoScreen';
import PersonalInfoScreen from '../../features/account/screens/PersonalInfoScreen';
import ExpertiseScreen from '../../features/account/screens/ExpertiseScreen';
import AppBar from '../../components/utils/AppBar';

const Stack = createStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}
    >
      <Stack.Screen name='Main' component={WelcomeScreen} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='UserType' component={UserTypeScreen} />
      <Stack.Screen name='BusinessInfo' component={BusinessInfoScreen} />
      <Stack.Screen name='Expertise' component={ExpertiseScreen} />
      <Stack.Screen name='PersonalInfo' component={PersonalInfoScreen} />
    </Stack.Navigator>
  );
}
