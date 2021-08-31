import React from 'react';
import StatsScreen from '../../../features/stats/screens/StatsScreen';
import AppBar from '../../../components/utils/AppBar';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const StatsStack = createStackNavigator();

export default function StatsNavigator({ route, navigation }) {
  return (
    <StatsStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
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
