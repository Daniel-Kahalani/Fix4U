import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import * as Notifications from 'expo-notifications';
import { clearError } from '../slices/inboxSlice';
import { ScrollView } from 'react-native';
import Notification from '../components/Notification';
import {
  NotificationDetailsContainer,
  NotificationDetailsBackground,
  NotificationDetailsCover,
} from '../styles/notficationDetailsStyles';

export default function NotficationDetailsScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { notification } = route.params;
  const responseListener = useRef();

  useEffect(() => {
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        navigation.goBack();
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [dispatch, navigation]);

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  return (
    <NotificationDetailsBackground>
      <NotificationDetailsCover>
        <ScrollView>
          <NotificationDetailsContainer>
            <Notification
              notification={notification}
              isFullDispaly={true}
              navigation={navigation}
            />
          </NotificationDetailsContainer>
        </ScrollView>
      </NotificationDetailsCover>
    </NotificationDetailsBackground>
  );
}
