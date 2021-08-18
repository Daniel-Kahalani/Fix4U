import React from 'react';
import SearchScreen from '../../features/serachRsp/screens/SearchScreen';
import SearchResultScreen from '../../features/serachRsp/screens/SearchResultScreen';
import AppBar from '../../components/utils/AppBar';

import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';

const SearchStack = createStackNavigator();

export default function SearchNavigator() {
  return (
    <SearchStack.Navigator
      screenOptions={{
        header: (props) => <AppBar {...props} />,
      }}
    >
      <SearchStack.Screen name='Search' component={SearchScreen} />
      <SearchStack.Screen name='SearchResult' component={SearchResultScreen} />
    </SearchStack.Navigator>
  );
}
