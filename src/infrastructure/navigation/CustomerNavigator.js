import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { loadPhoto } from '../../features/account/slices/userSlice';
import SettingsNavigator from './SettingsNavigator';
import StatsNavigator from './StatsNavigator';
import SearchNavigator from './SearchNavigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Search: 'md-search-outline',
  Stats: 'construct-sharp',
  Settings: 'stats-chart',
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
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
      <Tab.Screen name='Settings' component={SettingsNavigator} />
      <Tab.Screen name='Stats' component={StatsNavigator} />
      <Tab.Screen name='Search' component={SearchNavigator} />
    </Tab.Navigator>
  );
}
