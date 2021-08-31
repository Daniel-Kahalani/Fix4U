import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Avatar, Divider, Portal } from 'react-native-paper';
import {
  AppointmentCardContainer,
  AppointmentInfoCard,
  AvatarContainer,
  Time,
  Info,
  Title,
  ButtonsSection,
} from '../styles/AppointmentCardStyles.js';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Spacer from '../../../components/utils/Spacer.js';
import { RemoveAppointmentDialog } from './RemoveAppointmentDialog.js';
import { useNavigation } from '@react-navigation/native';

export const AppointmentCard = ({ appointment }) => {
  const { appointmentId, startTime, endTime, title, description } = appointment;
  const iconSize = 28;
  const clientAvatarText = title.toString().slice(0, 1).toUpperCase();

  const [isRemoveDialogVisible, setRemoveDialogVisible] = useState(false);

  const navigation = useNavigation();

  return (
    <AppointmentCardContainer>
      <Portal>
        <RemoveAppointmentDialog
          isVisible={isRemoveDialogVisible}
          setVisible={setRemoveDialogVisible}
          appointmentId={appointmentId}
        />
      </Portal>
      <ButtonsSection>
        <Spacer size='large'>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditAppointment', appointment)}
          >
            <FontAwesome5 name='edit' size={iconSize} color='black' />
          </TouchableOpacity>
        </Spacer>
        <Spacer size='large'>
          <TouchableOpacity
            onPress={() => setRemoveDialogVisible(!isRemoveDialogVisible)}
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
