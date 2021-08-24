import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptAppointment,
  declineAppointment,
  getNotifications,
} from '../slices/inboxSlice';
import Text from '../../../components/utils/Text';
import NotificationCardInfo from './NotificationCardInfo';
import {
  NotificationCard,
  CardContainer,
  NotificationIconContainer,
  NotificationIcon,
  InfoContainer,
  Info,
  CardActions,
  AcceptButton,
  DeclineButton,
  ErrorContainer,
} from '../styles/inboxStyles';
import Spacer from '../../../components/utils/Spacer';
import { ActivityIndicator, Colors } from 'react-native-paper';

export default function Notification({
  notification,
  isFullDispaly,
  navigation,
}) {
  const { title, startTime, endTime, date } = notification.attributes;
  const { loading, success, error } = useSelector((state) => state.inbox);
  const dispatch = useDispatch();

  const handleAccept = async () => {
    const resultAction = await dispatch(acceptAppointment(notification.id));
    if (
      acceptAppointment.fulfilled.match(resultAction) ||
      (resultAction.payload && resultAction.payload.code === 101)
    ) {
      let feedbackMsg = acceptAppointment.fulfilled.match(resultAction)
        ? 'The appointment was scheduled and added to your calendar'
        : 'Unable to schedule an appointment because Customer has been cancel his request';
      console.log('handleAccept get notifi');
      dispatch(getNotifications());
      navigation.navigate('Inbox', { feedbackMsg });
    }
  };

  const handleDecline = async () => {
    const resultAction = await dispatch(declineAppointment(notification.id));
    if (
      declineAppointment.fulfilled.match(resultAction) ||
      (resultAction.payload && resultAction.payload.code === 101)
    ) {
      dispatch(getNotifications());
      console.log('handleDecline get notifi');
      navigation.navigate('Inbox', {
        feedbackMsg: 'The appointment decline successfully',
      });
    }
  };

  return (
    <NotificationCard elevation={2}>
      <CardContainer>
        <NotificationIconContainer>
          <NotificationIcon icon='calendar-clock' />
        </NotificationIconContainer>
        <InfoContainer>
          <Text variant='label'>{title}</Text>
          <Info>{`Date: ${date}`}</Info>
          <Info>{`Time: ${startTime}-${endTime}`}</Info>
        </InfoContainer>
      </CardContainer>
      {isFullDispaly && (
        <>
          <Spacer size='large'>
            <NotificationCardInfo notification={notification} />
          </Spacer>
          {error && error.code !== 101 && (
            <ErrorContainer size='large'>
              <Text variant='error'>
                {error.message}
                {error.code}
              </Text>
            </ErrorContainer>
          )}
          {loading ? (
            <ActivityIndicator
              animating={true}
              color={Colors.blue300}
              size='large'
            />
          ) : (
            <CardActions>
              <AcceptButton mode='contained' onPress={handleAccept}>
                Accept
              </AcceptButton>
              <DeclineButton mode='contained' onPress={handleDecline}>
                Cancel
              </DeclineButton>
            </CardActions>
          )}
        </>
      )}
    </NotificationCard>
  );
}
