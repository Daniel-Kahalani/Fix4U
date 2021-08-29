import React from 'react';
import { useSelector } from 'react-redux';
import { RefreshControl, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserType } from '../../../infrastructure/utils/constants';
import RSPPastAppointment from './RSPPastAppointment';
import CustomerPastAppointment from './CustomerPastAppointment';

import Spacer from '../../../components/utils/Spacer';
import FadeInView from '../../../components/animations/FadeInView';
import { PastAppointmentsFlatList } from '../styles/historyStyles';

export default function PastAppointmentsList({ refreshing, handleRefresh }) {
  const { info } = useSelector((state) => state.user);
  const { pastAppointments } = useSelector((state) => state.history);
  const navigation = useNavigation();

  return (
    <PastAppointmentsFlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
      }
      data={pastAppointments}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('PastAppointmentDetails', {
              pastAppointment: item,
            })
          }
        >
          <Spacer position='bottom'>
            <FadeInView>
              {info.userType === UserType.RSP ? (
                <RSPPastAppointment
                  pastAppointment={item}
                  isFullDispaly={false}
                />
              ) : (
                <CustomerPastAppointment
                  pastAppointment={item}
                  isFullDispaly={false}
                />
              )}
            </FadeInView>
          </Spacer>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.appointmentId}
    />
  );
}
