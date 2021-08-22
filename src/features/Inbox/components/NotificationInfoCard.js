import React from 'react';
import { useDispatch } from 'react-redux';
import { acceptAppointment, declineAppointment } from '../slices/inboxSlice';
import Text from '../../../components/utils/Text';
import NotificationDetails from './NotificationDetails';
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
} from '../styles/inboxStyles';
import Spacer from '../../../components/utils/Spacer';

export default function NotificationInfoCard({ notification, isFullDispaly }) {
  const { title, startTime, endTime, date } = notification.attributes;
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(acceptAppointment(notification));
  };

  const handleDecline = () => {
    dispatch(declineAppointment(notification));
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
            <NotificationDetails notification={notification} />
          </Spacer>

          <CardActions>
            <AcceptButton mode='contained' onPress={handleAccept}>
              Accept
            </AcceptButton>
            <DeclineButton mode='contained' onPress={handleDecline}>
              Cancel
            </DeclineButton>
          </CardActions>
        </>
      )}
    </NotificationCard>
  );
}
