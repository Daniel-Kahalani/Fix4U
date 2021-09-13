import React from 'react';
import {
  createStackNavigator,
  TransitionPresets,
} from '@react-navigation/stack';
import SearchRSPScreen from '../../../features/serachRsp/screens/ScreenRSPScreen';
import SearchResultScreen from '../../../features/serachRsp/screens/SearchResultScreen';
import SearchByAvailabilityScreen from '../../../features/serachRsp/screens/SearchByAvailabilityScreen';
import SearchByNameScreen from '../../../features/serachRsp/screens/SearchByNameScreen';
import RspDetailsScreen from '../../../features/serachRsp/screens/RspDetailsScreen';
import AppBar from '../../../components/utils/AppBar';
import ReceiveAppointmentAnswerScreen from '../../../features/serachRsp/screens/ReceiveAppointmentAnswerScreen';

const SearchStack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <SearchStack.Screen
        name='MainSearch'
        component={SearchRSPScreen}
        options={{ title: 'Search RSP' }}
      />
      <SearchStack.Screen
        name='SearchByAvailability'
        component={SearchByAvailabilityScreen}
        options={{ title: 'Search By Availability' }}
      />
      <SearchStack.Screen
        name='SearchByNameScreen'
        component={SearchByNameScreen}
        options={{ title: 'Search By Name' }}
      />
      <SearchStack.Screen
        name='SearchResult'
        component={SearchResultScreen}
        options={{ title: 'Search Result' }}
      />
      <SearchStack.Screen
        name='RspDetails'
        component={RspDetailsScreen}
        options={{ title: 'Search Result' }}
      />
      <SearchStack.Screen
        name='ReceiveAppointmentAnswer'
        component={ReceiveAppointmentAnswerScreen}
      />
    </SearchStack.Navigator>
  );
}
