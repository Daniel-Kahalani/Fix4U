import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../theme/colors';
import { loadPhoto } from '../../../features/account/slices/userSlice';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import SettingsNavigator from '../common/SettingsNavigator';
import HistoryNavigator from '../common/HistoryNavigator';

import StatsNavigator from '../rsp/StatsNavigator';
import SearchNavigator from './SearchNavigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Search: 'md-search-outline',
  Stats: 'stats-chart',
  History: 'history',
  Settings: 'settings-outline',
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => {
      if (route.name === 'History') {
        return <FontAwesome name={iconName} size={size} color={color} />;
      }
      return <Ionicons name={iconName} size={size} color={color} />;
    },
  };
};

export default function CustomerNavigator() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadPhoto());
  }, [dispatch]);

  return (
    <Tab.Navigator
      initialRouteName='Settings'
      screenOptions={createScreenOptions}
      tabBarOptions={{
        activeTintColor: colors.brand.primary,
        inactiveTintColor: colors.brand.muted,
      }}
    >
      <Tab.Screen name='Search' component={SearchNavigator} />
      <Tab.Screen name='History' component={HistoryNavigator} />
      <Tab.Screen name='Stats' component={StatsNavigator} />
      <Tab.Screen name='Settings' component={SettingsNavigator} />
    </Tab.Navigator>
  );
}