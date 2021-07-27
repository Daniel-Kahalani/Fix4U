import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/account/slices/userSlice'; // should be move to 'settings' screen
import { Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';


const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Calendar: "calendar-outline",
  History: "construct-sharp",
  Settings: "settings-outline",
};

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name];
  return {
    tabBarIcon: ({ size, color }) => ( 
      <Ionicons name={iconName} size={size} color={color} />
    ),
  };
};

// temporary until all screen will be created
const Calendar = () => <Text>Calendar</Text>
const History = () => <Text>History</Text>
const Settings = () => <Text>Settings</Text>


export default function AppNavigator() {
  const dispatch = useDispatch();
  return (
        <Tab.Navigator
            initialRouteName="Calendar"
            screenOptions={createScreenOptions}
            tabBarOptions={{
              activeTintColor: colors.brand.primary,
              inactiveTintColor: colors.brand.muted,
            }}
          >
            <Tab.Screen name="Settings" component={Settings} />
            <Tab.Screen name="History" component={History} />
            <Tab.Screen name="Calendar" component={Calendar} />
          </Tab.Navigator>
  );
}
