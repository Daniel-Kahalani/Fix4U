import { useEffect, useRef } from 'react';
import * as Notifications from 'expo-notifications';
import { useDispatch } from 'react-redux';
import { getNotifications } from '../features/inbox/slices/inboxSlice';
export const usePushNotification = (navigation) => {
  const notificationListener = useRef();
  const responseListener = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        dispatch(getNotifications());
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigation.navigate('Inbox');
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);
};
