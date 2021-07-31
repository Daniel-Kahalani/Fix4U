import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';


const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Search: "calendar-outline",
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
const Search = () => <Text>Search</Text>
const History = () => <Text>History</Text>
const Settings = () => <Text>Settings</Text>


export default function CustomerNavigator() {
  const dispatch = useDispatch();
  
  return (
        <View>
          <Text>
            sdfsdfsdfsdf
          </Text>
        </View>
        // <Tab.Navigator
        //     initialRouteName="Search"
        //     screenOptions={createScreenOptions}
        //     tabBarOptions={{
        //       activeTintColor: colors.brand.primary,
        //       inactiveTintColor: colors.brand.muted,
        //     }}
        //   >
        //     {/* <Tab.Screen name="Settings" component={Settings} />
        //     <Tab.Screen name="History" component={History} /> */}
        //     {/* <Tab.Screen name="Search" component={CalendarNavigator} /> */}
        //   </Tab.Navigator>
  );
}
