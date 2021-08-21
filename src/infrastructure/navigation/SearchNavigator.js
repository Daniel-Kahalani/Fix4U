import React from 'react';
import SearchRSPScreen from '../../features/serachRsp/screens/ScreenRSPScreen';
import SearchResultScreen from '../../features/serachRsp/screens/SearchResultScreen';
import SearchByAvailabilityScreen from '../../features/serachRsp/screens/SearchByAvailabilityScreen';
import SearchByNameScreen from '../../features/serachRsp/screens/SearchByNameScreen';
import AppBar from '../../components/utils/AppBar';

import { createStackNavigator } from '@react-navigation/stack';

const SearchStack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}
    >
      <SearchStack.Screen name='MainSearch' component={SearchRSPScreen} />
      <SearchStack.Screen
        name='SearchByAvailability'
        component={SearchByAvailabilityScreen}
      />
      <SearchStack.Screen
        name='SearchByNameScreen'
        component={SearchByNameScreen}
      />
      <SearchStack.Screen name='SearchResult' component={SearchResultScreen} />
    </SearchStack.Navigator>
  );
}