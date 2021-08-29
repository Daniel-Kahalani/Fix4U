import React from 'react';
import HistoryScreen from '../../../features/history/screens/HistoryScreen';
import PastAppointmentDetailsScreen from '../../../features/history/screens/PastAppointmentDetailsScreen';
import FeedbackScreen from '../../../features/history/screens/FeedbackScreen';

import AppBar from '../../../components/utils/AppBar';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';

const HistoryStack = createStackNavigator();

export default function HistoryNavigator({ route, navigation }) {
  return (
    <HistoryStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <HistoryStack.Screen
        name='History'
        component={HistoryScreen}
        options={{ title: 'History' }}
      />
      <HistoryStack.Screen
        name='PastAppointmentDetails'
        component={PastAppointmentDetailsScreen}
        options={{ title: 'Details' }}
      />
      <HistoryStack.Screen
        name='Feedback'
        component={FeedbackScreen}
        options={{ title: 'Give a Feedback' }}
      />
    </HistoryStack.Navigator>
  );
}
