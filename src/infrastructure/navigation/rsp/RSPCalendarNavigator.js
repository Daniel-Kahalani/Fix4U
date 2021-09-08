import React from 'react';
import { usePushNotification } from '../../../infrastructure/utils/usePushNotification';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import CalendarScreen from '../../../features/RSP-calendar/screens/CalendarScreen.js';
import AddAppointmentScreen from '../../../features/RSP-calendar/screens/AddAppointmentScreen.js';
import EditAppointmentScreen from '../../../features/RSP-calendar/screens/EditAppointmentScreen.js';
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
      <CalendarStack.Screen
        name='Calendar'
        component={CalendarScreen}
        options={{ title: 'Calendar' }}
      />
      <CalendarStack.Screen
        name='AddAppointment'
        component={AddAppointmentScreen}
        options={{ title: 'Add Appointment' }}
      />
      <CalendarStack.Screen
        name='EditAppointment'
        component={EditAppointmentScreen}
        options={{ title: 'Edit Appointment' }}
      />
    </CalendarStack.Navigator>
  );
}
