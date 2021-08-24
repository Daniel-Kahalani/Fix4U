import React from 'react';
import InboxScreen from '../../features/Inbox/screens/InboxScreen';
import NotficationDetailsScreen from '../../features/Inbox/screens/NotficationDetailsScreen';

import AppBar from '../../components/utils/AppBar';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import { usePushNotification } from '../utils/usePushNotification';

const SettingsStack = createStackNavigator();

export default function SettingsNavigator({ route, navigation }) {
  usePushNotification(navigation);
  return (
    <SettingsStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <SettingsStack.Screen
        name='Inbox'
        component={InboxScreen}
        options={{ title: 'Inbox' }}
      />
      <SettingsStack.Screen
        name='NotificationDetails'
        component={NotficationDetailsScreen}
        options={{ title: 'Details' }}
      />
    </SettingsStack.Navigator>
  );
}
