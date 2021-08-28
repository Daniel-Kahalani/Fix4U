import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  acceptAppointment,
  declineAppointment,
  getNotifications,
} from '../slices/inboxSlice';
import { SnackBarType } from '../../../infrastructure/utils/constants';
import NotificationCardInfo from './NotificationCardInfo';
import Loader from '../../../components/utils/Loader';
import Text from '../../../components/utils/Text';
import Spacer from '../../../components/utils/Spacer';
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
} from '../styles/notificationStyles';

export default function Notification({
  notification,
  isFullDispaly,
  navigation,
}) {
  const dispatch = useDispatch();

  const { title, startTime, endTime, date } = notification.attributes;
  const { loading, error } = useSelector((state) => state.inbox);
  const handleAccept = async () => {
    const resultAction = await dispatch(acceptAppointment(notification.id));
    if (
      acceptAppointment.fulfilled.match(resultAction) ||
      (resultAction.payload && resultAction.payload.code === 101)
    ) {
      let type = acceptAppointment.fulfilled.match(resultAction)
        ? SnackBarType.SUCCESS
        : SnackBarType.ERROR;
      let message = acceptAppointment.fulfilled.match(resultAction)
        ? 'The appointment was scheduled and added to your calendar'
        : 'Unable to schedule an appointment because Customer has been cancel his request';
      console.log('handle accecpt getNotifications');
      dispatch(getNotifications());
      navigation.navigate('Inbox', { feedback: { message, type } });
    }
  };

  const handleDecline = async () => {
    const resultAction = await dispatch(declineAppointment(notification.id));
    if (
      declineAppointment.fulfilled.match(resultAction) ||
      (resultAction.payload && resultAction.payload.code === 101)
    ) {
      console.log('handle reject getNotifications');
      dispatch(getNotifications());
      navigation.navigate('Inbox', {
        feedback: {
          message: 'The appointment decline successfully',
          type: SnackBarType.SUCCESS,
        },
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
          <CardActions>
            {loading ? (
              <Loader />
            ) : (
              <>
                <AcceptButton mode='contained' onPress={handleAccept}>
                  Accept
                </AcceptButton>
                <DeclineButton mode='contained' onPress={handleDecline}>
                  Cancel
                </DeclineButton>
              </>
            )}
          </CardActions>
        </>
      )}
    </NotificationCard>
  );
}
