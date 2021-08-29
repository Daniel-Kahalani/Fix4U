import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadPhoto } from '../../../features/account/slices/userSlice';
import * as Notifications from 'expo-notifications';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { colors } from '../../theme/colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import RSPCalendarNavigator from './RSPCalendarNavigator';
import SettingsNavigator from '../common/SettingsNavigator';
import InboxNavigator from './InboxNavigator';
import HistoryNavigator from '../common/HistoryNavigator';
import StatsNavigator from './StatsNavigator';

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
  History: 'history',
  Stats: 'stats-chart',
  Settings: 'settings-outline',
  Inbox: 'notifications-outline',
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
      <Tab.Screen name='Calendar' component={RSPCalendarNavigator} />
      <Tab.Screen name='Inbox' component={InboxNavigator} />
      <Tab.Screen name='Stats' component={StatsNavigator} />
      <Tab.Screen name='History' component={HistoryNavigator} />
      <Tab.Screen name='Settings' component={SettingsNavigator} />
    </Tab.Navigator>
  );
}