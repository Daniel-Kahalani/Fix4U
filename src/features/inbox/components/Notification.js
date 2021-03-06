import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptAppointment,
  declineAppointment,
  getNotifications,
} from '../slices/inboxSlice';
import { SnackBarType } from '../../../infrastructure/utils/constants';
import { loadAppointments } from '../../../features/RSP-calendar/slices/calendarSlice';
import NotificationCardInfo from './NotificationCardInfo';
import Loader from '../../../components/utils/Loader';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
import {
  NotificationCard,
  CardContainer,
  NotificationAvatarContainer,
  NotificationIcon,
  InfoContainer,
  Title,
  Info,
  CardActions,
  AcceptButton,
  DeclineButton,
  ErrorContainer,
} from '../styles/notificationStyles';

export default function Notification({
  notification,
  isFullDispaly,
  navigation,
}) {
  const dispatch = useDispatch();

  const { startTime, endTime, date } = notification.attributes;
  const { loading, error } = useSelector((state) => state.inbox);
  const handleAccept = async () => {
    const resultAction = await dispatch(acceptAppointment(notification.id));
    if (
      acceptAppointment.fulfilled.match(resultAction) ||
      (resultAction.payload && resultAction.payload.code === 441)
    ) {
      const type = acceptAppointment.fulfilled.match(resultAction)
        ? SnackBarType.SUCCESS
        : SnackBarType.ERROR;
      const message = acceptAppointment.fulfilled.match(resultAction)
        ? 'The appointment was scheduled and added to your calendar'
        : resultAction.payload.message;
      if (acceptAppointment.fulfilled.match(resultAction)) {
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth() + 1;
        dispatch(loadAppointments({ year, month }));
      }

      navigateToInboxScreen(message, type);
    }
  };

  const handleDecline = async () => {
    const resultAction = await dispatch(declineAppointment(notification.id));
    if (declineAppointment.fulfilled.match(resultAction)) {
      navigateToInboxScreen(
        'The appointment decline successfully',
        SnackBarType.SUCCESS
      );
    }
  };

  const navigateToInboxScreen = (message, type) => {
    dispatch(getNotifications());
    navigation.navigate('Inbox', { feedback: { message, type } });
  };

  return (
    <NotificationCard elevation={2}>
      <CardContainer>
        <NotificationAvatarContainer>
          <NotificationIcon icon='calendar-clock' />
        </NotificationAvatarContainer>
        <InfoContainer>
          <Title variant='label'>Customer Appointment</Title>
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
              <Text variant='error'>{error.message}</Text>
            </ErrorContainer>
          )}
          <CardActions>
            {loading ? (
              <Loader />
            ) : (
              <>
                <AcceptButton mode='contained' onPress={handleAccept}>
                  Accept
                </AcceptButton>
                <DeclineButton mode='contained' onPress={handleDecline}>
                  Decline
                </DeclineButton>
              </>
            )}
          </CardActions>
        </>
      )}
    </NotificationCard>
  );
}
