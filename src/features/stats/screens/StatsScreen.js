/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button } from 'react-native';
import {
  getAvailableRSPs,
  getRSPAvailableHours,
  scheduleAppointment,
} from '../../serachRsp/slices/searchRSPSlice';
import Text from '../../../components/utils/Text';
export default function StatsScreen() {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.searchRSP);
  const handlePress1 = () => {
    dispatch(
      getAvailableRSPs({
        faultType: 'Appliances',
        date: '19/08/21',
      })
    );
  };

  const handlePress2 = () => {
    dispatch(
      getRSPAvailableHours({
        faultType: 'Appliances',
        date: '19/08/21',
        businessName: 'johnTech',
      })
    );
  };

  const handlePress3 = () => {
    dispatch(
      scheduleAppointment({
        customerId: 'HQB4B0T3it',
        faultDescripton: 'computer crashed',
        rspId: 'VQjlJzoP2e',
        date: '19/08/21',
        time: '09:00',
        location: 'tel aviv',
      })
    );
  };

  return (
    <View>
      <Button onPress={handlePress1} title='search all' />
      <Button onPress={handlePress2} title='search spesific' />
      <Button onPress={handlePress3} title='schedule' />

      {error && (
        <Text>
          {error.message} {error.code}
        </Text>
      )}
      {success && <Text>{success ? 'success' : 'failed'}</Text>}
    </View>
  );
}

// import Constants from 'expo-constants';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//   getAvailableRSPs,
//   getRSPAvailableHours,
//   scheduleAppointment,
// } from '../../serachRsp/slices/searchRSPSlice';
// import * as Notifications from 'expo-notifications';
// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });

// export default function StatsScreen() {
//   const dispatch = useDispatch();
//   const { error, success } = useSelector((state) => state.searchRSP);
//   const [expoPushToken, setExpoPushToken] = useState('');
//   const [notification, setNotification] = useState(false);
//   const notificationListener = useRef();
//   const responseListener = useRef();

//   const handlePress1 = () => {
//     dispatch(
//       getAvailableRSPs({
//         faultType: 'Appliances',
//         date: '19/08/21',
//       })
//     );
//   };

//   const handlePress2 = () => {
//     dispatch(
//       getRSPAvailableHours({
//         faultType: 'Appliances',
//         date: '19/08/21',
//         businessName: 'johnTech',
//       })
//     );
//   };

//   const handlePress3 = () => {
//     dispatch(
//       scheduleAppointment({
//         rspId: 'VQjlJzoP2e',
//         date: '19/08/21',
//         time: '09:00',
//       })
//     );
//   };

//   useEffect(() => {
//     // registerForPushNotificationsAsync().then((token) =>
//     //   setExpoPushToken(token)
//     // ); //save token in state // need to save in database

//     notificationListener.current =
//       Notifications.addNotificationReceivedListener((notification1) => {
//         setNotification(notification1);
//       }); //save the new notification in state

//     responseListener.current =
//       Notifications.addNotificationResponseReceivedListener((response) => {
//         console.log(response); //what happaend when click to response
//       });

//     // return () => {
//     //   Notifications.removeNotificationSubscription(
//     //     notificationListener.current
//     //   );
//     //   Notifications.removeNotificationSubscription(responseListener.current);
//     // };
//   }, []);

//   return (
//     <View
//       style={{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'space-around',
//       }}
//     >
//       <View>
//         <Button onPress={handlePress1} title='search all' />
//         <Button onPress={handlePress2} title='search spesific' />
//         <Button onPress={handlePress3} title='schedule' />
//         {error && (
//           <Text>
//             {error.message} {error.code}
//           </Text>
//         )}
//         {success && <Text>{success ? 'success' : 'failed'}</Text>}
//       </View>

//       <Text>Your expo push token: {expoPushToken}</Text>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text>
//           Title: {notification && notification.request.content.title}{' '}
//         </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>
//           Data:{' '}
//           {notification && JSON.stringify(notification.request.content.data)}
//         </Text>
//       </View>
//       <Button
//         title='Press to schedule a notification'
//         onPress={async () => {
//           await schedulePushNotification();
//         }}
//       />
//     </View>
//   );
// }

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got mail! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

///get push token from user // move to account slice
// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Constants.isDevice) {
//     const { status: existingStatus } =
//       await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       console.log('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
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

//   return token;
// }
