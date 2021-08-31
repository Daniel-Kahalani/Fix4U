import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import StatsScreen from '../../../features/stats/screens/StatsScreen';
import AppBar from '../../../components/utils/AppBar';

const StatsStack = createStackNavigator();

export default function StatsNavigator({ route, navigation }) {
  return (
    <StatsStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <StatsStack.Screen
        name='Stats'
        component={StatsScreen}
        options={{ title: 'Stats' }}
      />
    </StatsStack.Navigator>
  );
}
