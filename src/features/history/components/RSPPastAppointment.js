import React from 'react';
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
} from '../styles/pastAppointmentStyles';

export default function RSPPastAppointment({ pastAppointment, isFullDispaly }) {
  const { customerName, location, date, startTime, endTime } = pastAppointment;

  return (
    <PastAppointmentCard elevation={2}>
      <CardContainer>
        <AppointmentAvatarContainer>
          <AppoitmentText label={customerName[0]} />
        </AppointmentAvatarContainer>
        <InfoContainer>
          <Title variant='label'>{customerName}</Title>
          <Info>{`Date: ${date}`}</Info>
          <Info>{`Location: ${location}`}</Info>
          {isFullDispaly && <Info>{`Time: ${startTime}-${endTime}`}</Info>}
        </InfoContainer>
      </CardContainer>
      {isFullDispaly && (
        <>
          <Spacer size='large'>
            <PastAppointmentCardInfo pastAppointment={pastAppointment} />
          </Spacer>
        </>
      )}
    </PastAppointmentCard>
  );
}
