import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';

export const usePushNotification = (navigation) => {
  // const notificationListener = useRef();
  const responseListener = useRef();
  useEffect(() => {
    // notificationListener.current =
    //   Notifications.addNotificationReceivedListener((notification1) => {
    //     // setNotification(notification1);
    //   }); //save the new notification in state

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response); //what happaend when click to response
        navigation.navigate('Inbox');
      });

    return () => {
      // Notifications.removeNotificationSubscription(
      //   notificationListener.current
      // );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
};
