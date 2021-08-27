import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Avatar, Divider } from 'react-native-paper';
import {
  AppointmentCardContainer,
  AppointmentInfoCard,
  AvatarContainer,
  Time,
  Info,
  Title,
  ButtonsSection,
} from './AppointmentCardStyles.js';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from '../../../components/utils/Spacer.js';
import { RemoveAppointmentModal } from '../components/RemoveAppointmentModal.js';
import { EditAppointmentModal } from '../components/EditAppointmentModal.js';

export const AppointmentCard = ({ appointment }) => {
  const { appointmentId, startTime, endTime, title, description } = appointment;
  const iconSize = 28;
  const clientAvatarText = title.toString().slice(0, 1).toUpperCase();

  const [isRemoveFormVisible, setRemoveFormVisible] = useState(false);
  const [isEditFormVisible, setEditFormVisible] = useState(false);

  return (
    <AppointmentCardContainer>
      <RemoveAppointmentModal
        isModalVisible={isRemoveFormVisible}
        setModalVisible={setRemoveFormVisible}
        appointmentId={appointmentId}
      />
      <EditAppointmentModal
        appointment={appointment}
        isModalVisible={isEditFormVisible}
        setModalVisible={setEditFormVisible}
        appointmentId={appointmentId}
      />
      <ButtonsSection>
        <Spacer size='large'>
          <TouchableOpacity
            onPress={() => setEditFormVisible(!isEditFormVisible)}
          >
            <FontAwesome5 name='edit' size={iconSize} color='black' />
          </TouchableOpacity>
        </Spacer>
        <Spacer size='large'>
          <TouchableOpacity
            onPress={() => setRemoveFormVisible(!isRemoveFormVisible)}
          >
            <Ionicons
              name='remove-circle-outline'
              size={iconSize}
              color={'black'}
            />
          </TouchableOpacity>
        </Spacer>
      </ButtonsSection>
      <AppointmentInfoCard elevation={1}>
        <AvatarContainer>
          <Avatar.Text size={24} label={clientAvatarText} />
        </AvatarContainer>
        <Info>
          <Time>
            <Text variant='label'>
              {startTime} - {endTime}
            </Text>
            <Divider />
          </Time>
          <Title>
            <Text variant='label'>{title}</Text>
            <Divider />
          </Title>
          <Text variant='label'>{description}</Text>
        </Info>
      </AppointmentInfoCard>
    </AppointmentCardContainer>
  );
};
