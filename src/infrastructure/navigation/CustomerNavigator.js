import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { loadPhoto } from '../../features/account/slices/userSlice';
import SettingsNavigator from './SettingsNavigator';
import HistoryNavigator from './HistoryNavigator';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Search: 'calendar-outline',
  History: 'stats-chart',
  Settings: 'settings-outline',
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
      <Tab.Screen name='History' component={HistoryNavigator} />
      {/* <Tab.Screen name="Search" component={CalendarNavigator} /> */}
    </Tab.Navigator>
  );
}
