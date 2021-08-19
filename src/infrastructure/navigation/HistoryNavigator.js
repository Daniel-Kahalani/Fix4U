import React from 'react';
import HistroyScreen from '../../features/history/screens/HistroyScreen';

import AppBar from '../../components/utils/AppBar';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const HistoryStack = createStackNavigator();

export default function HistoryNavigator({ route, navigation }) {
  return (
    <HistoryStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <HistoryStack.Screen
        name='History'
        component={HistroyScreen}
        options={{ title: 'History' }}
      />
    </HistoryStack.Navigator>
  );
}
