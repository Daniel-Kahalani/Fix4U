import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';
import { getNotifications } from '../../features/Inbox/slices/inboxSlice';
export const usePushNotification = (navigation) => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigation.navigate('Inbox');
        console.log('push click getNotifications');
        dispatch(getNotifications());
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [dispatch, navigation]);
};
