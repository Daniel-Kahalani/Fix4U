import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import WelcomeScreen from '../../../features/account/screens/WelcomeScreen';
import LoginScreen from '../../../features/account/screens/LoginScreen';
import UserTypeScreen from '../../../features/account/screens/UserTypeScreen';
import BusinessInfoScreen from '../../../features/account/screens/BusinessInfoScreen';
import ExpertiseScreen from '../../../features/account/screens/ExpertiseScreen';
import PersonalInfoScreen from '../../../features/account/screens/PersonalInfoScreen';
import AppBar from '../../../components/utils/AppBar';

const AccountStack = createStackNavigator();

export default function AccountNavigator() {
  return (
    <AccountStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <AccountStack.Screen name='Main' component={WelcomeScreen} />
      <AccountStack.Screen
        name='Login'
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <AccountStack.Screen
        name='UserType'
        component={UserTypeScreen}
        options={{ title: 'Register' }}
      />
      <AccountStack.Screen
        name='BusinessInfo'
        component={BusinessInfoScreen}
        options={{ title: 'Register' }}
      />
      <AccountStack.Screen
        name='Expertise'
        component={ExpertiseScreen}
        options={{ title: 'Register' }}
      />
      <AccountStack.Screen
        name='PersonalInfo'
        component={PersonalInfoScreen}
        options={{ title: 'Register' }}
      />
    </AccountStack.Navigator>
  );
}
