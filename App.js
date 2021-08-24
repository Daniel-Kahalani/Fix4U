import React, { useState } from 'react';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';
import { ThemeProvider } from 'styled-components/native';
import { theme } from './src/infrastructure/theme';
import {
  useFonts as useOswald,
  Oswald_400Regular,
} from '@expo-google-fonts/oswald';
import { useFonts as useLato, Lato_400Regular } from '@expo-google-fonts/lato';
import { Provider } from 'react-redux';
import Navigation from './src/infrastructure/navigation/Navigation';
import store from './src/infrastructure/store';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Parse from 'parse/react-native';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  '07Fb0bRf3rQO93M9iFPPpWqsweUOzK0qHCDtSr2I',
  'A88NlTl5shLVU7Bo5bbsnIp13yDV6EpbbmXIoRfo'
);
Parse.serverURL = 'http://192.168.1.19:1337/parse';
// Parse.serverURL = 'https://parseapi.back4app.com/';

export default function App() {
  const [oswaldLoaded] = useOswald({
    Oswald_400Regular,
  });

  const [latoLoaded] = useLato({
    Lato_400Regular,
  });

  if (!oswaldLoaded || !latoLoaded) {
    return null;
  }

  return (
    <>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Navigation />
        </Provider>
      </ThemeProvider>
      <ExpoStatusBar style='auto' />
    </>
  );
}
