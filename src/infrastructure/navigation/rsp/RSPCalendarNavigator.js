import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../../../features/RSP-calendar/screens/CalendarScreen.js';
import AppBar from '../../../components/utils/AppBar.js';
// import { usePushNotification } from '../../infrastructure/utils/usePushNotification';

const CalendarStack = createStackNavigator();

export default function RSPCalendarNavigator({ navigation }) {
  // usePushNotification(navigation);

  return (
    <CalendarStack.Navigator
      headerMode='screen'
      screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}
    >
      <CalendarStack.Screen name='Calendar' component={CalendarScreen} />
    </CalendarStack.Navigator>
  );
}
