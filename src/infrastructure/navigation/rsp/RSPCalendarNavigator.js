import React from 'react';
import { usePushNotification } from '../../../infrastructure/utils/usePushNotification';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import CalendarScreen from '../../../features/RSP-calendar/screens/CalendarScreen.js';
import AppBar from '../../../components/utils/AppBar.js';

const CalendarStack = createStackNavigator();

export default function RSPCalendarNavigator({ navigation }) {
  usePushNotification(navigation);

  return (
    <CalendarStack.Navigator
      headerMode='screen'
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <CalendarStack.Screen name='Calendar' component={CalendarScreen} />
    </CalendarStack.Navigator>
  );
}
