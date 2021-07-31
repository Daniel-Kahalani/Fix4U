import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { CalendarNavigator } from './RSP/CalendarNavigator';
import { CalendarScreen } from '../../features/account/screens/RSP/CalendarScreen.js';
import SettingsNavigator from './SettingsNavigator';
import { loadPhoto } from '../../features/account/slices/userSlice';

const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Calendar: 'calendar-outline',
  History: 'construct-sharp',
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

export default function RSPNavigator() {
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
      {/* <Tab.Screen name="History" component={History} /> */}
      {/* <Tab.Screen name='Calendar' component={CalendarScreen} /> */}
    </Tab.Navigator>
  );
}
