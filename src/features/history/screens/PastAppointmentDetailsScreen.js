import React from 'react';
import { useSelector } from 'react-redux';
import { UserType } from '../../../infrastructure/utils/constants';
import { ScrollView } from 'react-native';
import RSPPastAppointment from '../components/RSPPastAppointment';
import CustomerPastAppointment from '../components/CustomerPastAppointment';

import {
  PastAppointmentDetailsContainer,
  PastAppointmentDetailsBackground,
  PastAppointmentDetailsCover,
} from '../styles/pastAppointmentDetailsStyles';

export default function PastAppointmentDetailsScreen({ route }) {
  const { info } = useSelector((state) => state.user);

  const { pastAppointment } = route.params;

  return (
    <PastAppointmentDetailsBackground>
      <PastAppointmentDetailsCover>
        <ScrollView>
          <PastAppointmentDetailsContainer>
            {info.userType === UserType.RSP ? (
              <RSPPastAppointment
                pastAppointment={pastAppointment}
                isFullDispaly={true}
              />
            ) : (
              <CustomerPastAppointment
                pastAppointment={pastAppointment}
                isFullDispaly={true}
              />
            )}
          </PastAppointmentDetailsContainer>
        </ScrollView>
      </PastAppointmentDetailsCover>
    </PastAppointmentDetailsBackground>
  );
}
