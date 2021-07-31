import React from "react";

import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";

import { CalendarScreen } from "../../../features/account/screens/RSP/CalendarScreen.js";
//import { VisitDetailScreen } from "../../../features/account/screens/RSP/CalendarDetailScreen.js";

const CalendarStack = createStackNavigator();

export const CalendarNavigator = () => {
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