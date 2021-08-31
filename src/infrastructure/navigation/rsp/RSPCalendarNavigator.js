import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CalendarScreen from '../../features/RSP-calendar/screens/CalendarScreen.js';
import AddAppointmentScreen from '../../features/RSP-calendar/screens/AddAppointmentScreen.js';
import EditAppointmentScreen from '../../features/RSP-calendar/screens/EditAppointmentScreen.js';
import AppBar from '../../components/utils/AppBar.js';
import { usePushNotification } from '../../infrastructure/utils/usePushNotification';

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
      <CalendarStack.Screen
        name='AddAppointment'
        component={AddAppointmentScreen}
      />
      <CalendarStack.Screen
        name='EditAppointment'
        component={EditAppointmentScreen}
      />
    </CalendarStack.Navigator>
  );
}
