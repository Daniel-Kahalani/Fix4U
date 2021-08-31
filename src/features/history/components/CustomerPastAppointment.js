import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import CustomerPastAppointmentCardInfo from './CustomerPastAppointmentCardInfo';
import Spacer from '../../../components/utils/Spacer';

import {
  PastAppointmentCard,
  CardContainer,
  AppointmentAvatarContainer,
  AppoitmentText,
  InfoContainer,
  Info,
  Title,
  CardActions,
  FeedbackButton,
} from '../styles/pastAppointmentStyles';

export default function CustomerPastAppointment({
  pastAppointment,
  isFullDispaly,
}) {
  const navigation = useNavigation();
  const { date, startTime, endTime, rsp, isFeedbacked } = pastAppointment;
  const todayDate = format(new Date(Date.now()), 'dd/MM/yy');

  return (
    <PastAppointmentCard elevation={2}>
      <CardContainer>
        <AppointmentAvatarContainer>
          <AppoitmentText label={rsp.businessName[0]} />
        </AppointmentAvatarContainer>
        <InfoContainer>
          <Title variant='label'>{rsp.businessName}</Title>
          <Info>{`Date: ${date}`}</Info>
          <Info>{`Time: ${startTime}-${endTime}`}</Info>
        </InfoContainer>
      </CardContainer>
      {isFullDispaly && (
        <>
          <Spacer size='large'>
            <CustomerPastAppointmentCardInfo
              pastAppointment={pastAppointment}
            />
          </Spacer>
          <CardActions>
            <FeedbackButton
              mode='contained'
              disabled={todayDate === date || isFeedbacked}
              onPress={() =>
                navigation.navigate('Feedback', { ...pastAppointment })
              }
            >
              Give A Feedback
            </FeedbackButton>
          </CardActions>
        </>
      )}
    </PastAppointmentCard>
  );
}
