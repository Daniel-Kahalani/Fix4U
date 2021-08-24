import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearError } from '../slices/inboxSlice';
import { ScrollView } from 'react-native';
import { NotificationDetailsContainer } from '../styles/notficationDetailsStyles';
import Notification from '../components/Notification';
export default function NotficationDetailsScreen({ route, navigation }) {
  const dispatch = useDispatch();
  const { notification } = route.params;

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  return (
    <ScrollView>
      <NotificationDetailsContainer>
        <Notification
          notification={notification}
          isFullDispaly={true}
          navigation={navigation}
        />
      </NotificationDetailsContainer>
    </ScrollView>
  );
}
