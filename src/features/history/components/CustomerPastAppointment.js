import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';

import PastAppointmentCardInfo from './PastAppointmentCardInfo';
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
  const { date, startTime, endTime, businessName } = pastAppointment;
  const todayDate = format(new Date(Date.now()), 'dd/MM/yy');

  return (
    <PastAppointmentCard elevation={2}>
      <CardContainer>
        <AppointmentAvatarContainer>
          <AppoitmentText label={businessName[0]} />
        </AppointmentAvatarContainer>
        <InfoContainer>
          <Title variant='label'>{businessName}</Title>
          <Info>{`Date: ${date}`}</Info>
          <Info>{`Time: ${startTime}-${endTime}`}</Info>
        </InfoContainer>
      </CardContainer>
      {isFullDispaly && (
        <>
          <Spacer size='large'>
            <PastAppointmentCardInfo pastAppointment={pastAppointment} />
          </Spacer>
          <CardActions>
            <FeedbackButton
              mode='contained'
              disabled={todayDate === date}
              onPress={() => navigation.navigate('Feedback')}
            >
              Give A Feedback
            </FeedbackButton>
          </CardActions>
        </>
      )}
    </PastAppointmentCard>
  );
}
