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

import firebase from 'firebase/app';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(
  '07Fb0bRf3rQO93M9iFPPpWqsweUOzK0qHCDtSr2I',
  'A88NlTl5shLVU7Bo5bbsnIp13yDV6EpbbmXIoRfo'
);
Parse.serverURL = 'http://192.168.1.19:1337/parse';
// Parse.serverURL = 'https://parseapi.back4app.com/';

// const firebaseConfig = {
//   apiKey: 'AIzaSyAjuZ2rnVzO1eDCjEAlcVQfYpKuBdV26Us',
//   authDomain: 'fix4u-f9cc6.firebaseapp.com',
//   projectId: 'fix4u-f9cc6',
//   storageBucket: 'fix4u-f9cc6.appspot.com',
//   messagingSenderId: '332958354126',
//   appId: '1:332958354126:web:f9a706f0907962704e9e9f',
//   measurementId: 'G-K6Q4W10LHK',
// };
// firebase.initializeApp(firebaseConfig);

export default function App() {
  // const [expoPushToken, setExpoPushToken] = useState(null);
  // const registerForPushNotificationsAsync = async () => {
  //   if (Constants.isDevice) {
  //     console.log('asking premminsen');
  //     const { status: existingStatus } =
  //       await Notifications.getPermissionsAsync();
  //     console.log('getting answer');
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync();
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       console.log('Failed to get push token for push notification!');
  //       return;
  //     }
  //     const token = (await Notifications.getExpoPushTokenAsync()).data;
  //     console.log(token);
  //     // this.setState({ expoPushToken: token });
  //     setExpoPushToken(token);
  //   } else {
  //     console.log('Must use physical device for Push Notifications');
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C',
  //     });
  //   }
  // };
  // registerForPushNotificationsAsync();

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
