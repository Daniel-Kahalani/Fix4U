import React from 'react';
import InboxScreen from '../../../features/inbox/screens/InboxScreen';
import NotficationDetailsScreen from '../../../features/inbox/screens/NotficationDetailsScreen';

import AppBar from '../../../components/utils/AppBar';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

const InboxStack = createStackNavigator();

export default function InboxNavigator({ route, navigation }) {
  return (
    <InboxStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <InboxStack.Screen
        name='Inbox'
        component={InboxScreen}
        options={{ title: 'Inbox' }}
      />
      <InboxStack.Screen
        name='NotificationDetails'
        component={NotficationDetailsScreen}
        options={{ title: 'Details' }}
      />
    </InboxStack.Navigator>
  );
}
