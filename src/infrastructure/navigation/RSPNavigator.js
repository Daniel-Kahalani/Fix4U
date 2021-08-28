import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import RSPCalendarNavigator from './RSPCalendarNavigator.js';
import SettingsNavigator from './SettingsNavigator';
import InboxNavigator from './InboxNavigator';
import StatsNavigator from './StatsNavigator';
import { loadPhoto } from '../../features/account/slices/userSlice';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Calendar: 'calendar-outline',
  Stats: 'stats-chart',
  Settings: 'settings-outline',
  Inbox: 'notifications-outline',
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => (
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

export default function RSPNavigator(props) {
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
      <Tab.Screen name='Inbox' component={InboxNavigator} />
      <Tab.Screen name='Settings' component={SettingsNavigator} />
      <Tab.Screen name='Stats' component={StatsNavigator} />
      <Tab.Screen name='Calendar' component={RSPCalendarNavigator} />
    </Tab.Navigator>
  );
}
