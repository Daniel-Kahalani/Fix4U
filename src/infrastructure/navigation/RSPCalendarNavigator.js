import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import CalendarScreen from "../../features/RSP-calendar/screens/CalendarScreen.js"
//import { VisitDetailScreen } from "../../features/RSP-calendar/screens/CalendarDetailScreen.js";

const CalendarStack = createStackNavigator();

export default function RSPCalendarNavigator() {
  return (
    <CalendarStack.Navigator 
      headerMode="none"
      screenOptions={{
        ...TransitionPresets.ModalPresentationIOS,
      }}
    >
      <CalendarStack.Screen
        name="Calendar"
        component={CalendarScreen}
      />
      
    </CalendarStack.Navigator>
  );
};